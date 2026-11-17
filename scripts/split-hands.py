"""
Делит public/videos/hero-hands-loop.mp4 на два слоя:
  hero-hands-left.webm / .mp4  - только робот (правая рука вырезана), фон чёрный
  hero-hands-right.webm        - только правая рука, VP9 с прозрачностью (yuva420p)

Нужно: Python 3, ffmpeg в PATH (с libvpx-vp9 и libx264), pip install opencv-python numpy
Запуск:
  python scripts/split-hands.py public/videos/hero-hands-loop.mp4 public/videos [папка_для_превью]

Как делится: правая рука = всё, что правее вертикального шва между кончиками пальцев.
Шов ищем от правого края: середина первой пустой щели; если пальцы касаются (кульминация
анимации) и щели нет, берём самый тонкий столбец рядом с прошлым швом. Внутри руки заливаются "дыры" от
штриховки, чтобы текст не просвечивал сквозь неё.
"""
import subprocess, sys
import numpy as np
import cv2

SRC = sys.argv[1]
OUTDIR = sys.argv[2]
PREVIEW_DIR = sys.argv[3] if len(sys.argv) > 3 else None
PREVIEW_AT = {0, 2, 60, 77, 80, 90, 96, 200, 283, 290, 330, 379}

W, H = 1920, 1080

dec = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "bgr24", "-"],
    stdout=subprocess.PIPE,
)

def raw_in(pix):
    return ["-f", "rawvideo", "-pix_fmt", pix, "-s", f"{W}x{H}", "-r", "24", "-i", "-"]

enc_right = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y"] + raw_in("bgra") + [
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "27",
        "-deadline", "good", "-cpu-used", "4", "-row-mt", "1", "-auto-alt-ref", "0", "-an",
        f"{OUTDIR}/hero-hands-right.webm"],
    stdin=subprocess.PIPE)

enc_left_webm = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y"] + raw_in("bgr24") + [
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuv420p", "-b:v", "0", "-crf", "26",
        "-deadline", "good", "-cpu-used", "4", "-row-mt", "1", "-an",
        f"{OUTDIR}/hero-hands-left.webm"],
    stdin=subprocess.PIPE)

enc_left_mp4 = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y"] + raw_in("bgr24") + [
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "medium",
        "-movflags", "+faststart", "-an",
        f"{OUTDIR}/hero-hands-left.mp4"],
    stdin=subprocess.PIPE)

k_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (17, 17))
k_erode = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))

n = 0
prev_cut = None
while True:
    buf = dec.stdout.read(W * H * 3)
    if len(buf) < W * H * 3:
        break
    frame = np.frombuffer(buf, np.uint8).reshape(H, W, 3)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # 1. foreground = anything clearly brighter than the black background
    fg0 = (gray > 40).astype(np.uint8) * 255

    # 2. split the two hands by the empty vertical gap between the fingertips:
    #    scan from the right edge; the first (nearly) empty column is the seam.
    cols = (fg0 > 0).sum(axis=0)
    x_cut = None
    for x in range(W - 1, -1, -1):
        if cols[x] <= 2:
            x_cut = x
            # тонкий кончик пальца (1-2 px на столбец) тоже "пустой": идём влево до конца щели
            # и режем по её середине, чтобы кончик пальца целиком попал в слой руки
            run_left = x
            while run_left > 0 and cols[run_left - 1] <= 2:
                run_left -= 1
            if x - run_left >= 6:
                x_cut = (x + run_left) // 2
            break
    if x_cut is None:
        # Кончики пальцев касаются: пустой щели нет. Режем по самому "тонкому" столбцу
        # рядом с прошлым швом (или в средней зоне кадра, если прошлого шва нет).
        if prev_cut is not None and prev_cut < W - 100:
            lo, hi = max(0, prev_cut - 40), min(W - 1, prev_cut + 40)
        else:
            lo, hi = 700, 1600
        x_cut = lo + int(np.argmin(cols[lo:hi + 1]))
    prev_cut = x_cut
    fg = (gray > 18).astype(np.uint8) * 255
    fg[:, : x_cut + 1] = 0

    # 3. close small gaps (stipple shading) so the hand becomes a solid blob,
    #    keep blobs that touch the right edge
    fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, k_close)
    num, labels, stats, _ = cv2.connectedComponentsWithStats(fg, connectivity=8)
    keep = np.zeros_like(fg)
    for i in range(1, num):
        x, y, w, h, area = stats[i]
        if area >= 400 and x + w >= W - 2:
            keep[labels == i] = 255

    # 4. fill interior holes (pad with an empty 1px frame so the flood starts on real background)
    pad = cv2.copyMakeBorder(keep, 1, 1, 1, 1, cv2.BORDER_CONSTANT, value=0)
    inv = cv2.bitwise_not(pad)
    ff_mask = np.zeros((H + 4, W + 4), np.uint8)
    cv2.floodFill(inv, ff_mask, (0, 0), 0)
    holes = inv[1:-1, 1:-1]
    solid = cv2.bitwise_or(keep, holes)

    # 5. pull the edge in by ~1px and soften it to avoid a dark fringe
    solid = cv2.erode(solid, k_erode, iterations=1)
    alpha = cv2.GaussianBlur(solid, (0, 0), 1.0)

    bgra = np.dstack([frame, alpha])
    enc_right.stdin.write(bgra.tobytes())

    # base layer: the same frame, but the right hand is cut out (small margin so no halo is left)
    cut = cv2.dilate(solid, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
    left = frame.copy()
    left[cut > 0] = 0
    left[:, x_cut + 1:] = 0   # всё правее шва принадлежит руке, в нижнем слое там пусто
    lb = left.tobytes()
    enc_left_webm.stdin.write(lb)
    enc_left_mp4.stdin.write(lb)

    if PREVIEW_DIR and n in PREVIEW_AT:
        # preview over a white band, like white headline text
        bg = np.full((H, W, 3), 40, np.uint8)
        bg[620:760, :, :] = 245
        a = (alpha.astype(np.float32) / 255.0)[..., None]
        comp = (frame.astype(np.float32) * a + bg.astype(np.float32) * (1 - a)).astype(np.uint8)
        cv2.imwrite(f"{PREVIEW_DIR}/prev_{n:03d}.png", cv2.resize(comp, (960, 540)))
        cv2.imwrite(f"{PREVIEW_DIR}/mask_{n:03d}.png", cv2.resize(alpha, (960, 540)))
    n += 1

for e in (enc_right, enc_left_webm, enc_left_mp4):
    e.stdin.close()
for e in (enc_right, enc_left_webm, enc_left_mp4):
    e.wait()
dec.wait()
print("frames:", n)
