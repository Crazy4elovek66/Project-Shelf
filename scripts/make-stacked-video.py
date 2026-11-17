import subprocess
import cv2
import numpy as np
import time

SRC = "public/videos/hero-hands-loop.mp4"
OUT_MP4 = "public/videos/hero-hands-stacked.mp4"
OUT_WEBM = "public/videos/hero-hands-stacked.webm"

W, H = 1920, 1080

dec = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"],
    stdout=subprocess.PIPE,
)

# Output is 1920 x 2160 (stacked: top 1080 is color, bottom 1080 is mask)
enc_mp4 = subprocess.Popen(
    [
        "ffmpeg", "-v", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H * 2}", "-r", "24", "-i", "-",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "veryfast",
        "-movflags", "+faststart", "-an", OUT_MP4
    ],
    stdin=subprocess.PIPE
)

enc_webm = subprocess.Popen(
    [
        "ffmpeg", "-v", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H * 2}", "-r", "24", "-i", "-",
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0", "-crf", "28",
        "-deadline", "good", "-cpu-used", "4", "-row-mt", "1", "-an", OUT_WEBM
    ],
    stdin=subprocess.PIPE
)

k_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17))
k_erode = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))

n = 0
prev_cut = None
start_time = time.time()

print("Starting stacked video generation...")

while True:
    buf = dec.stdout.read(W * H * 3)
    if len(buf) < W * H * 3:
        break
    frame = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 1. Foreground threshold
    fg0 = (gray > 40).astype(np.uint8) * 255

    # 2. Find vertical cut between fingertips
    cols = (fg0 > 0).sum(axis=0)
    x_cut = None
    for x in range(W - 1, -1, -1):
        if cols[x] <= 2:
            x_cut = x
            run_left = x
            while run_left > 0 and cols[run_left - 1] <= 2:
                run_left -= 1
            if x - run_left >= 6:
                x_cut = (x + run_left) // 2
            break
    if x_cut is None:
        if prev_cut is not None and prev_cut < W - 100:
            lo, hi = max(0, prev_cut - 40), min(W - 1, prev_cut + 40)
        else:
            lo, hi = 700, 1600
        x_cut = lo + int(np.argmin(cols[lo:hi + 1]))
    prev_cut = x_cut

    # 3. Mask for right hand only
    fg = (gray > 18).astype(np.uint8) * 255
    fg[:, : x_cut + 1] = 0

    fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, k_close)
    num, labels, stats, _ = cv2.connectedComponentsWithStats(fg, connectivity=8)
    keep = np.zeros_like(fg)
    for i in range(1, num):
        x, y, w, h, area = stats[i]
        if area >= 400 and x + w >= W - 2:
            keep[labels == i] = 255

    # 4. Fill interior holes
    pad = cv2.copyMakeBorder(keep, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=0)
    inv = cv2.bitwise_not(pad)
    ff_mask = np.zeros((H + 4, W + 4), np.uint8)
    cv2.floodFill(inv, ff_mask, (0, 0), 0)
    holes = inv[1:-1, 1:-1]
    solid = cv2.bitwise_or(keep, holes)

    # 5. Smooth edge slightly
    solid = cv2.erode(solid, k_erode, iterations=1)
    alpha = cv2.GaussianBlur(solid, (0, 0), 1.0)

    # 6. Stack vertically: Top is color frame (1920x1080), Bottom is mask (1920x1080 as BGR)
    mask_bgr = cv2.cvtColor(alpha, cv2.COLOR_GRAY2BGR)
    stacked = np.vstack([frame, mask_bgr])

    raw_bytes = stacked.tobytes()
    enc_mp4.stdin.write(raw_bytes)
    enc_webm.stdin.write(raw_bytes)

    n += 1
    if n % 50 == 0:
        print(f"Processed frame {n}/380 ({n/380*100:.1f}%)")

enc_mp4.stdin.close()
enc_webm.stdin.close()
enc_mp4.wait()
enc_webm.wait()
dec.wait()

elapsed = time.time() - start_time
print(f"Done! {n} frames encoded in {elapsed:.1f}s")
