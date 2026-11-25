"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export function SeamlessPortraitVideo() {
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let currentlyInView = false;

    const syncPlayback = () => {
      const el = videoRef.current;
      if (!el || hasError) return;
      if (currentlyInView && !document.hidden && !prefersReducedMotion) {
        el.defaultMuted = true;
        el.muted = true;
        el.volume = 0;
        el.play().catch(() => {
          setHasError(true);
        });
      } else {
        el.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        currentlyInView = entry.isIntersecting;
        setInView(entry.isIntersecting);
        syncPlayback();
      },
      { rootMargin: "250px" }
    );

    observer.observe(container);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [hasError]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[400px] rounded-xl border border-white/10 bg-[#050505] overflow-hidden select-none"
    >
      {/* Video Portrait Flush to Bottom Edge */}
      {!hasError ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-10 flex items-end justify-center translate-y-[3%] sm:translate-y-[4%] overflow-hidden">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            poster="/images/portrait-poster.webp"
            preload={inView ? "auto" : "none"}
            controls={false}
            disablePictureInPicture
            onLoadedMetadata={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.volume = 0;
            }}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-bottom transition-all duration-300 grayscale contrast-[1.14] brightness-[1.04]"
            style={{
              mixBlendMode: "screen",
              filter: "grayscale(100%) contrast(1.14) brightness(1.04)",
              maskImage:
                "linear-gradient(to top, #000 0%, #000 92%, transparent 100%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, #000 0%, #000 92%, transparent 100%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          >
            {inView && (
              <source
                src={isMobile ? "/videos/portrait-loop-mobile.mp4" : "/videos/portrait-loop.mp4"}
                type="video/mp4"
              />
            )}
          </video>
        </div>
      ) : (
        /* Fallback image if video fails to load / iOS Low Power Mode */
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 z-10 flex items-end justify-center translate-y-[3%] sm:translate-y-[4%] overflow-hidden">
          <Image
            src="/images/hero-portrait-cutout.webp"
            alt="Ilya idleON Portrait Cutout"
            fill
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-bottom grayscale contrast-125 brightness-105 pointer-events-none select-none no-select-media"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
