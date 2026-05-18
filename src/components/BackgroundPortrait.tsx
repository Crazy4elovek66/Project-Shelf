"use client";

import Image from "next/image";

export function BackgroundPortrait() {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 right-0 z-[1] hidden select-none overflow-hidden lg:block lg:w-[min(48vw,760px)]"
      aria-hidden="true"
    >
      {/* Glow effect */}
      <div className="absolute right-0 top-[16%] h-[520px] w-[520px] rounded-full opacity-85 blur-[36px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(120,210,255,0.12),transparent_62%)]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(150,105,255,0.14),transparent_68%)]" />
      </div>

      {/* Portrait image */}
      <Image
        src="/images/hero-portrait-cutout.png"
        alt=""
        width={680}
        height={900}
        priority
        className="absolute bottom-0 right-[clamp(-170px,-7vw,-70px)] h-auto w-[min(42vw,680px)] max-h-[92vh] object-contain object-right-bottom opacity-[0.82]"
        style={{
          filter: "contrast(1.02) saturate(0.9) brightness(0.86)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 76%, transparent 100%), linear-gradient(to right, transparent 0%, black 18%, black 100%), radial-gradient(circle at 55% 45%, black 58%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0.72) 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 12%, black 76%, transparent 100%), linear-gradient(to right, transparent 0%, black 18%, black 100%), radial-gradient(circle at 55% 45%, black 58%, rgba(0,0,0,0.92) 70%, rgba(0,0,0,0.72) 82%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Fade overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #080a10 0%, rgba(8, 10, 16, 0.7) 18%, transparent 42%), linear-gradient(to bottom, transparent 60%, #080a10 100%)",
        }}
      />
    </div>
  );
}
