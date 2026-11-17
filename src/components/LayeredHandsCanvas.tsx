"use client";

import { useEffect, useRef } from "react";

interface LayeredHandsCanvasProps {
  children?: React.ReactNode;
}

export function LayeredHandsCanvas({ children }: LayeredHandsCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lowerCanvasRef = useRef<HTMLCanvasElement>(null);
  const upperCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const lowerCanvas = lowerCanvasRef.current;
    const upperCanvas = upperCanvasRef.current;
    const container = containerRef.current;
    if (!video || !lowerCanvas || !upperCanvas || !container) return;

    const lowerCtx = lowerCanvas.getContext("2d");
    const upperCtx = upperCanvas.getContext("2d");
    if (!lowerCtx || !upperCtx) return;

    // Offscreen buffers for high-performance Luma-to-Alpha processing
    const bufferWidth = 960;
    const bufferHeight = 540;

    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = bufferWidth;
    offscreenCanvas.height = bufferHeight;
    const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
    if (!offscreenCtx) return;

    const matteCanvas = document.createElement("canvas");
    matteCanvas.width = bufferWidth;
    matteCanvas.height = bufferHeight;
    const matteCtx = matteCanvas.getContext("2d");
    if (!matteCtx) return;

    let animId: number | null = null;
    let isVisible = true;
    let smoothedSplitX = bufferWidth * 0.52; // initial split anchor

    // Central region for gap detection between hands
    const minCol = Math.floor(bufferWidth * 0.42); // 403
    const maxCol = Math.floor(bufferWidth * 0.60); // 576
    const minY = Math.floor(bufferHeight * 0.25);   // 135
    const maxY = Math.floor(bufferHeight * 0.85);   // 459

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const processAndDrawFrame = () => {
      offscreenCtx.drawImage(video, 0, 0, bufferWidth, bufferHeight);
      const imgData = offscreenCtx.getImageData(0, 0, bufferWidth, bufferHeight);
      const data = imgData.data;
      const totalPixels = data.length;

      // 1. Luma-to-Alpha matte transformation
      for (let i = 0; i < totalPixels; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Rec. 601 luma calculation
        const luma = 0.299 * r + 0.587 * g + 0.114 * b;

        if (luma <= 22) {
          data[i + 3] = 0; // complete transparency for black background
        } else {
          // Smooth hermite curve for clean edge anti-aliasing
          const t = Math.min(1, (luma - 22) / 72);
          const alpha = Math.round(t * t * (3 - 2 * t) * 255);
          data[i + 3] = alpha;

          // Un-premultiply RGB to crisp white/light-gray without dark halos
          const boost = Math.min(255, Math.round(luma * 1.15));
          data[i] = boost;
          data[i + 1] = boost;
          data[i + 2] = boost;
        }
      }

      // 2. Dynamic split boundary detection in central region
      let minSum = Infinity;
      let bestCol = Math.round(bufferWidth * 0.51);

      for (let x = minCol; x <= maxCol; x += 2) {
        let colSum = 0;
        for (let y = minY; y <= maxY; y += 4) {
          colSum += data[(y * bufferWidth + x) * 4 + 3];
        }
        if (colSum < minSum) {
          minSum = colSum;
          bestCol = x;
        }
      }

      smoothedSplitX = smoothedSplitX * 0.7 + bestCol * 0.3;
      const split = Math.round(smoothedSplitX);

      // 3. Put processed alpha data into matte canvas
      matteCtx.putImageData(imgData, 0, 0);

      // 4. Render Lower Canvas (z-10): Left Hand (Robot) behind FULL-STACK
      lowerCtx.clearRect(0, 0, bufferWidth, bufferHeight);
      lowerCtx.drawImage(
        matteCanvas,
        0,
        0,
        split,
        bufferHeight,
        0,
        0,
        split,
        bufferHeight
      );

      // 5. Render Upper Canvas (z-30): Right Hand (Human) above AI DEVELOPER
      upperCtx.clearRect(0, 0, bufferWidth, bufferHeight);
      upperCtx.drawImage(
        matteCanvas,
        split,
        0,
        bufferWidth - split,
        bufferHeight,
        split,
        0,
        bufferWidth - split,
        bufferHeight
      );
    };

    const renderLoop = () => {
      if (!isVisible) return;

      if (video.readyState >= 2 && !video.paused && !video.ended) {
        processAndDrawFrame();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const startAnimation = () => {
      if (!animId && !prefersReducedMotion) {
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const stopAnimation = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    // Video events to guarantee autoplay
    video.muted = true;
    video.volume = 0;
    video.playsInline = true;

    const handleCanPlay = () => {
      video.play().catch(() => {});
      if (prefersReducedMotion) {
        processAndDrawFrame();
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", startAnimation);
    video.play().catch(() => {});

    startAnimation();

    // IntersectionObserver targeting #hero with 0 threshold
    const heroSection = document.getElementById("hero") || container;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView && !isVisible) {
          isVisible = true;
          video.play().catch(() => {});
          startAnimation();
        } else if (!inView && isVisible) {
          isVisible = false;
          video.pause();
          stopAnimation();
        }
      },
      { threshold: 0 }
    );
    observer.observe(heroSection);

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        video.pause();
        stopAnimation();
      } else {
        isVisible = true;
        video.play().catch(() => {});
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", startAnimation);
      video.pause();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flow-root">
      {/* Hidden single video frame source (offscreen, hardware decoded) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <source src="/videos/hero-hands-loop.webm" type="video/webm" />
        <source src="/videos/hero-hands-loop.mp4" type="video/mp4" />
      </video>

      {/* Layer 1: Left Hand (Robot) behind FULL-STACK (z-10) */}
      <canvas
        ref={lowerCanvasRef}
        width={960}
        height={540}
        aria-hidden="true"
        className="pointer-events-none relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20 -mb-4 w-screen select-none sm:-mt-[13vw] sm:-mb-[15.5vw] z-10 block h-auto aspect-video"
      />

      {/* Layer 2: Main Content Block (z-20) */}
      {children}

      {/* Layer 3: Right Hand (Human) above AI DEVELOPER (z-30) */}
      <canvas
        ref={upperCanvasRef}
        width={960}
        height={540}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20 -mb-4 w-screen select-none sm:-mt-[13vw] sm:-mb-[15.5vw] z-30 block h-auto aspect-video"
      />
    </div>
  );
}
