"use client";

import { useLanguageMode } from "@/context/LanguageModeContext";

const techTickerItems = [
  "БЫСТРЫЙ ВЫХОД В MVP ЗА 7-14 ДНЕЙ",
  "ОТСЕВ ШУМА & ДЕДУПЛИКАЦИЯ",
  "MULTI-AGENT PIPELINES",
  "TELEGRAM MINI APPS",
  "COMPUTER VISION & FFMPEG",
  "PRODUCTION FULL-STACK",
  "100% ОТКРЫТЫЙ И ЧИСТЫЙ КОД",
  "LLM FALLBACK ROUTING БЕЗ ПАДЕНИЙ",
];

const simpleTickerItems = [
  "ЗАПУСК ПРОЕКТА ЗА 7-14 ДНЕЙ",
  "УМНЫЕ БОТЫ В TELEGRAM",
  "САЙТЫ И СЕРВИСЫ ПОД КЛЮЧ",
  "АВТОМАТИЗАЦИЯ РУТИНЫ С ИИ",
  "СТАБИЛЬНАЯ РАБОТА 24/7",
  "ПОНЯТНЫЙ РЕЗУЛЬТАТ ДЛЯ БИЗНЕСА",
];

export function KineticMarquee() {
  const { isSimple, mode } = useLanguageMode();
  const items = isSimple ? simpleTickerItems : techTickerItems;
  // Duplicate array inside track to guarantee width > 3000px on 2K/4K displays
  const trackItems = [...items, ...items];

  return (
    <div className="marquee-wrapper w-full border-y border-white/10 py-2.5 sm:py-3 bg-[#08080A] overflow-hidden select-none">
      <div key={mode} className="animate-marquee-seamless flex w-max">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-8 pr-8">
          {trackItems.map((item, idx) => (
            <div key={`track1-${idx}`} className="flex items-center gap-8 font-mono text-xs text-zinc-400">
              <span className="hover:text-white transition-colors tracking-wide font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="text-white/40 text-[10px] font-pixel">[ / ]</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Exact duplicate for seamless infinite loop) */}
        <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
          {trackItems.map((item, idx) => (
            <div key={`track2-${idx}`} className="flex items-center gap-8 font-mono text-xs text-zinc-400">
              <span className="hover:text-white transition-colors tracking-wide font-medium whitespace-nowrap">
                {item}
              </span>
              <span className="text-white/40 text-[10px] font-pixel">[ / ]</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
