"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error("[AppError]", error);
    }
  }, [error]);

  return (
    <div className="min-h-[100dvh] bg-[#050505] text-[#FAFAFA] font-mono flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl border border-white/15 bg-[#09090C] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 text-xs text-zinc-400 border-b border-white/10 pb-3 mb-4">
          <span className="size-2 rounded-full bg-white" />
          <span className="font-bold text-white">SYS_ERR // RUNTIME_RECOVERY</span>
        </div>
        <h1 className="text-lg font-bold text-white mb-2">Произошел сбой интерфейса</h1>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6">
          Модуль столкнулся с непредвиденной ошибкой. Нажмите кнопку ниже, чтобы восстановить работу страницы.
        </p>
        <button
          type="button"
          onClick={reset}
          className="w-full rounded-lg bg-white px-4 py-3 text-xs font-bold text-black hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          &gt;_ ВОССТАНОВИТЬ СЕССИЮ
        </button>
      </div>
    </div>
  );
}
