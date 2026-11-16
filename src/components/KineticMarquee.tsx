"use client";

const tickerItems = [
  "БЫСТРЫЙ ВЫХОД В MVP ЗА 7-14 ДНЕЙ",
  "ОТСЕВ ШУМА & ДЕДУПЛИКАЦИЯ",
  "MULTI-AGENT PIPELINES",
  "TELEGRAM MINI APPS",
  "COMPUTER VISION & FFMPEG",
  "PRODUCTION FULL-STACK",
  "100% ОТКРЫТЫЙ И ЧИСТЫЙ КОД",
  "LLM FALLBACK ROUTING БЕЗ ПАДЕНИЙ",
];

export function KineticMarquee() {
  return (
    <div className="w-full border-y border-white/10 py-3 bg-[#08080A] overflow-hidden select-none">
      <div className="marquee-track flex w-max gap-8 animate-marquee-left">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 font-mono text-xs text-zinc-400">
            <span className="hover:text-white transition-colors tracking-wide font-medium">
              {item}
            </span>
            <span className="text-white/40 text-[10px] font-pixel">[ / ]</span>
          </div>
        ))}
      </div>
    </div>
  );
}
