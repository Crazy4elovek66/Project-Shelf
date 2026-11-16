"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01アイウエオカキクケコサシスセソ<>/{}[]=:+-*#@$%&01";

export function MatrixCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontSize = 11;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    let animationFrameId = 0;
    let lastTime = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.max(1, Math.floor(width / (fontSize + 3)));
      drops = Array.from({ length: columns }, () => Math.random() * -30);
      speeds = Array.from({ length: columns }, () => 0.35 + Math.random() * 0.45);
    };

    resize();
    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const drawFrame = (time: number) => {
      if (!prefersReduced && time - lastTime < 42) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }
      lastTime = time;

      ctx.fillStyle = "rgba(5, 5, 5, 0.10)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `400 ${fontSize}px var(--font-mono), monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < columns; i++) {
        const x = i * (fontSize + 3) + 2;
        const y = drops[i] * fontSize;
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

        if (y > -fontSize && y < height) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
          ctx.fillText(char, x, y);

          const trailChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          ctx.fillStyle = "rgba(212, 212, 216, 0.30)";
          ctx.fillText(trailChar, x, y - fontSize);
        }

        if (!prefersReduced) {
          drops[i] += speeds[i];
          if (y > height && Math.random() > 0.975) {
            drops[i] = Math.random() * -12;
          }
        }
      }

      if (!prefersReduced) {
        animationFrameId = requestAnimationFrame(drawFrame);
      }
    };

    animationFrameId = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-90"
      style={{
        maskImage:
          "radial-gradient(ellipse 95% 92% at 50% 48%, rgba(0,0,0,0.6) 0%, #000 55%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 95% 92% at 50% 48%, rgba(0,0,0,0.6) 0%, #000 55%, transparent 100%)",
      }}
    />
  );
}
