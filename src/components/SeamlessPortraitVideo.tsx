"use client";

import { useState } from "react";
import Image from "next/image";

export function SeamlessPortraitVideo() {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] rounded-xl border border-white/10 bg-[#050505] overflow-hidden flex items-center justify-center select-none">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Seamless Video with mix-blend-mode: screen & radial edge mask */}
      {!hasError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasError(true)}
          className="relative z-10 w-auto h-full max-h-[320px] object-contain object-center transition-all duration-300"
          style={{
            mixBlendMode: "screen",
            filter: "contrast(1.06) brightness(0.96)",
            maskImage: "radial-gradient(ellipse 74% 80% at 50% 48%, #000 58%, transparent 96%)",
            WebkitMaskImage: "radial-gradient(ellipse 74% 80% at 50% 48%, #000 58%, transparent 96%)",
          }}
        >
          <source src="/videos/portrait-loop.mp4" type="video/mp4" />
          <source src="/videos/video_1.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Fallback image if video fails to load in older browsers */
        <Image
          src="/images/hero-portrait-cutout.png"
          alt="Илья - Full-Stack AI Developer"
          width={380}
          height={480}
          className="relative z-10 w-auto h-full max-h-[300px] object-contain object-bottom opacity-80"
          style={{
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
      )}

      {/* Subtle Terminal Scan Line overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-full pointer-events-none" />

      {/* Bottom Technical Tag */}
      <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-20 font-mono text-[10px] text-zinc-500 bg-[#050505]/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
        <span className="flex items-center gap-1.5 text-zinc-300">
          <span className="size-1.5 rounded-full bg-white animate-pulse" />
          <span>NEURAL_PORTRAIT_FEED</span>
        </span>
        <span className="text-zinc-600">FPS: 60 // CODE_REFLECT</span>
      </div>
    </div>
  );
}
