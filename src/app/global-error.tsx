"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="min-h-[100dvh] bg-[#050505] text-[#FAFAFA] font-mono flex items-center justify-center p-4 antialiased">
        <div className="max-w-md w-full rounded-2xl border border-white/15 bg-[#09090C] p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-xs text-zinc-400 border-b border-white/10 pb-3 mb-4">
            <span className="size-2 rounded-full bg-white" />
            <span className="font-bold text-white">CRITICAL // KERNEL_PANIC</span>
          </div>
          <h1 className="text-lg font-bold text-white mb-2">Критическая ошибка приложения</h1>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Перезагрузите интерфейс для восстановления стабильной работы.
          </p>
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-lg bg-white px-4 py-3 text-xs font-bold text-black hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            &gt;_ ПЕРЕЗАГРУЗИТЬ
          </button>
        </div>
      </body>
    </html>
  );
}
