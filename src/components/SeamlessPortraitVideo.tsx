"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MatrixCodeRain } from "./MatrixCodeRain";

export function SeamlessPortraitVideo() {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Guarantee that the video is completely silent programmatically
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.volume = 0;
    el.play().catch(() => {});
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[400px] rounded-xl border border-white/10 bg-[#050505] overflow-hidden select-none">
      {/* Layer 0: Delicate Black & White Matrix Code Rain Background */}
      <MatrixCodeRain />

      {/* Layer 1: Scaled Video Flush to Bottom Edge */}
      {!hasError ? (
        <div className="absolute inset-x-0 bottom-0 h-full w-full flex items-end justify-center pointer-events-none z-10 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.volume = 0;
            }}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-bottom scale-[1.16] origin-bottom transition-all duration-300"
            style={{
              mixBlendMode: "screen",
              filter: "contrast(1.08) brightness(0.96)",
              maskImage:
                "linear-gradient(to top, #000 0%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, #000 0%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            <source src="/videos/portrait-loop.mp4" type="video/mp4" />
            <source src="/videos/orig-silent.mp4" type="video/mp4" />
            <source src="/videos/orig.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        /* Fallback image if video fails to load in older environments */
        <div className="absolute inset-x-0 bottom-0 h-full w-full flex items-end justify-center pointer-events-none z-10 overflow-hidden">
          <Image
            src="/images/hero-portrait-cutout.png"
            alt="Илья - Full-Stack AI Developer"
            width={380}
            height={480}
            className="w-auto h-full max-h-[380px] object-contain object-bottom opacity-85"
            style={{
              maskImage:
                "linear-gradient(to top, #000 0%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, #000 0%, #000 78%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%)",
            }}
          />
        </div>
      )}

      {/* Subtle Terminal Scan Line overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-full pointer-events-none z-15" />

      {/* Layer 2: Telemetry Strip resting on top of the bottom edge */}
      <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-20 font-mono text-[10px] text-zinc-400 bg-[#050505]/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          <span>NEURAL_PORTRAIT_FEED</span>
        </span>
        <span className="text-zinc-500 font-pixel text-[9px]">MATRIX_STREAM // 60 FPS</span>
      </div>
    </div>
  );
}
