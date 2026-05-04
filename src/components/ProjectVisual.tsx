import type { Project } from "@/data/projects";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-0">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.visual.accent} opacity-10`} />

      <div className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-105">
        <ProjectMockup title={project.title} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#080a10] via-transparent to-transparent opacity-90" />

      <div className="pointer-events-none absolute bottom-5 left-5 z-20">
        <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-slate-200 backdrop-blur-md">
          {project.visual.label}
        </span>
      </div>
    </div>
  );
}

function ProjectMockup({ title }: { title: Project["title"] }) {
  switch (title) {
    case "JobRadar":
      return <JobRadarMockup />;
    case "ProfitCheck":
      return <ProfitCheckMockup />;
    case "Twitch AI Viewers":
      return <TwitchMockup />;
    case "Aura.net":
      return <AuraNetMockup />;
    case "AutoClip":
      return <AutoClipMockup />;
    default:
      return <FallbackMockup />;
  }
}

function TelegramShell({
  botName,
  avatarClassName,
  children,
}: {
  botName: string;
  avatarClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[232px] w-full max-w-[340px] flex-col overflow-hidden rounded-xl border border-[#263341] bg-[#0b111b] shadow-2xl">
      <div className="flex h-11 shrink-0 items-center gap-2.5 border-b border-black/40 bg-[#17212b] px-3">
        <div className={`size-8 rounded-full ${avatarClassName}`} />
        <div className="min-w-0">
          <div className="truncate text-[11px] font-semibold leading-none text-white">{botName}</div>
          <div className="mt-1 text-[9px] leading-none text-[#75b7ed]">bot</div>
        </div>
        <div className="ml-auto flex items-center gap-3 text-[#7d8b9a]">
          <div className="size-3 rounded-full border-2 border-current" />
          <div className="h-4 w-1 rounded-full bg-current opacity-70" />
        </div>
      </div>

      <div className="relative flex flex-1 flex-col gap-1.5 overflow-hidden p-2.5">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#7ea0bf_1px,transparent_1px)] [background-size:14px_14px]" />
        <div className="relative z-10 flex flex-1 flex-col gap-1.5">{children}</div>
      </div>

      <div className="flex h-10 shrink-0 items-center gap-2 border-t border-black/40 bg-[#17212b] px-2.5">
        <div className="relative size-5 rounded-full border-2 border-[#7b8794] after:absolute after:-right-1 after:top-1 after:h-3 after:w-1 after:rounded-full after:border-r-2 after:border-[#7b8794]" />
        <div className="flex h-6 flex-1 items-center rounded-full bg-[#202b38] px-3">
          <div className="h-1.5 w-20 rounded bg-[#7b8794]/70" />
        </div>
        <div className="h-5 w-3 rounded-b-full rounded-t-sm border-2 border-[#7b8794]" />
      </div>
    </div>
  );
}

function JobRadarMockup() {
  return (
    <TelegramShell botName="JobRadar" avatarClassName="bg-gradient-to-br from-slate-600 via-slate-800 to-emerald-900">
      <div className="ml-auto flex max-w-[62%] items-center gap-1 rounded-2xl rounded-tr-md bg-[#315f8d] px-3 py-2">
        <div className="h-2 w-20 rounded bg-white/75" />
        <div className="ml-auto flex gap-0.5">
          <span className="h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-[#6ec1ff]" />
          <span className="h-2.5 w-1.5 rotate-45 border-b-2 border-r-2 border-[#6ec1ff]" />
        </div>
      </div>
      <div className="w-[84%] rounded-2xl rounded-tl-md bg-[#182636] p-2.5 shadow-sm">
        <div className="h-2 w-[92%] rounded bg-white/70" />
        <div className="mt-1.5 h-2 w-[74%] rounded bg-white/55" />
        <div className="mt-1.5 h-2 w-[54%] rounded bg-white/35" />
        <div className="ml-auto mt-1 h-1.5 w-8 rounded bg-[#8da4b8]/70" />
      </div>
      <div className="w-[86%] rounded-2xl rounded-tl-md bg-[#182636] p-2.5">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-300" />
          <div className="h-2 w-24 rounded bg-white/80" />
        </div>
        <div className="mt-3 grid gap-1.5">
          {[86, 64, 72, 52].map((width, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div className="grid size-3.5 place-items-center rounded bg-[#20c93a] text-[10px] font-black leading-none text-white">
                ✓
              </div>
              <div className="h-1.5 rounded bg-white/45" style={{ width: `${width}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 h-2 w-14 rounded bg-white/70" />
        <div className="mt-1.5 h-2 w-28 rounded bg-[#6ec1ff]/70" />
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <div className="h-5 rounded-md bg-[#223345]" />
          <div className="h-5 rounded-md bg-[#223345]" />
        </div>
        <div className="ml-auto mt-1 h-1.5 w-8 rounded bg-[#8da4b8]/70" />
      </div>
    </TelegramShell>
  );
}

function ProfitCheckMockup() {
  return (
    <TelegramShell botName="ProfitCheck" avatarClassName="bg-[radial-gradient(circle_at_35%_35%,#f8d38a,#6d4322_48%,#14161b_72%)]">
      <div className="ml-auto rounded-2xl rounded-tr-md bg-[#315f8d] px-3 py-2">
        <div className="h-2 w-12 rounded bg-[#79c7ff]" />
      </div>
      <div className="w-[78%] rounded-2xl rounded-tl-md bg-[#182636] p-2.5">
        <div className="h-2 w-[88%] rounded bg-white/70" />
        <div className="mt-1.5 h-2 w-[58%] rounded bg-white/45" />
        <div className="mt-4 space-y-1.5">
          {[68, 86, 76, 50].map((width, index) => (
            <div key={index} className="h-1.5 rounded bg-white/35" style={{ width: `${width}%` }} />
          ))}
        </div>
        <div className="ml-auto mt-1 h-1.5 w-8 rounded bg-[#8da4b8]/70" />
      </div>
      <div className="mx-auto rounded-full bg-[#1c2c3a] px-4 py-1 text-[10px] font-bold text-white">4 мая</div>
      <div className="ml-auto rounded-2xl rounded-tr-md bg-[#315f8d] px-3 py-2 text-[12px] leading-none text-white">
        700+1000
      </div>
      <div className="w-[80%] rounded-2xl rounded-tl-md bg-[#182636] p-2.5">
        <div className="h-2 w-20 rounded bg-white/75" />
        <div className="mt-3 space-y-1.5">
          {[56, 72, 62, 78, 48, 68, 58].map((width, index) => (
            <div key={index} className="h-1.5 rounded bg-white/38" style={{ width: `${width}%` }} />
          ))}
        </div>
        <div className="ml-auto mt-1 h-1.5 w-8 rounded bg-[#8da4b8]/70" />
      </div>
    </TelegramShell>
  );
}

function TwitchMockup() {
  return (
    <div className="flex h-[224px] w-full max-w-[360px] overflow-hidden rounded-xl border border-[#272846] bg-[#0d0d15] shadow-2xl">
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-sm border-2 border-[#8c34ff] bg-[#261044]" />
          <div className="h-3 w-28 rounded bg-white/85" />
          <div className="ml-auto h-5 w-16 rounded-md border border-white/10 bg-[#24263d]" />
          <div className="h-5 w-20 rounded-full border border-[#333654] bg-[#17182a]" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[52, 44, 58, 50].map((width, index) => (
            <div key={index} className="rounded-md border border-[#282a45] bg-[#191a2d] p-2">
              <div className="h-1.5 w-12 rounded bg-[#8c91a7]/70" />
              <div className="mt-2 h-3 rounded bg-white/85" style={{ width: `${width}%` }} />
              <div className="mt-1 h-1 w-8 rounded bg-[#8c91a7]/30" />
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-[#292b46] bg-[#17182b] p-3">
          <div className="mx-auto mb-2 h-2.5 w-24 rounded bg-white/85" />
          <div className="flex items-center gap-2">
            <div className="h-6 flex-1 rounded-md border border-[#30324f] bg-[#10111c]" />
            <Toggle />
            <div className="grid h-7 w-20 place-items-center rounded-md bg-[#9633ff] text-[8px] font-black tracking-wide text-white shadow-[0_0_14px_rgba(147,51,255,.55)]">
              START SYSTEM
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {[74, 86, 66, 80, 70].map((width, index) => (
              <div key={index} className="flex h-4 items-center rounded bg-[#2a2c45] px-2">
                <div className="mr-2 size-2 rounded-full bg-[#7d29e8]" />
                <div className="h-1.5 rounded bg-white/35" style={{ width: `${width}%` }} />
                <Toggle className="ml-auto scale-75" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-[28%] flex-col border-l border-[#2a2b43] bg-[#151519]">
        <div className="grid h-8 place-items-center border-b border-[#2a2b43]">
          <div className="h-2 w-16 rounded bg-white/70" />
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2">
          <div className="h-1.5 w-20 rounded bg-[#8c91a7]/50" />
          <div className="h-1.5 w-12 rounded bg-[#8c91a7]/30" />
        </div>
        <div className="mx-2 mb-1 space-y-1.5">
          <div className="ml-auto h-3 w-12 rounded bg-[#27283a]" />
          <div className="h-3 w-14 rounded bg-[#27283a]" />
        </div>
        <div className="m-2 h-6 rounded bg-white/20" />
      </div>
    </div>
  );
}

function AuraNetMockup() {
  return (
    <div className="relative h-[224px] w-full max-w-[360px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,.13)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-x-0 top-0 flex h-10 items-center border-b border-white/10 px-3">
        <div className="text-[13px] font-black leading-none text-[#a63cff]">AURA<span className="text-white/70">.NET</span></div>
        <div className="ml-auto flex gap-2">
          <div className="h-5 w-14 rounded-md border border-white/10" />
          <div className="h-5 w-14 rounded-md border border-[#a63cff]/50 bg-[#a63cff]/15" />
        </div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center pt-9">
        <div className="mb-3 rounded-full border border-[#a63cff]/45 bg-black/60 px-5 py-1.5 text-[11px] font-bold text-[#b24cff] shadow-[0_0_20px_rgba(168,85,247,.18)]">
          Бета · ранний доступ
        </div>
        <div className="text-center text-[52px] font-black leading-none tracking-normal text-[#ad43ff] drop-shadow-[0_0_16px_rgba(168,85,247,.95)]">
          AURA<span className="text-white/70 drop-shadow-none">.NET</span>
        </div>
        <div className="mt-3 h-2 w-36 rounded bg-white/25" />
        <div className="mt-5 flex gap-3">
          <div className="h-8 w-24 rounded-lg bg-[#b044ff] shadow-[0_0_18px_rgba(168,85,247,.5)]" />
          <div className="h-8 w-24 rounded-lg border border-white/15 bg-black/20" />
        </div>
      </div>
    </div>
  );
}

function AutoClipMockup() {
  return (
    <div className="flex h-[224px] w-full max-w-[360px] flex-col overflow-hidden rounded-xl border border-[#555] bg-[#282828] shadow-2xl">
      <div className="flex h-6 items-center border-b border-[#4b4b4b] bg-[#1f1f1f] px-2">
        <div className="mr-2 size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-black" />
        <div className="h-2 w-24 rounded bg-white/75" />
        <div className="ml-auto flex gap-2">
          <div className="h-2 w-4 rounded bg-white/70" />
          <div className="size-2 border border-white/70" />
          <div className="size-2 rotate-45 border-r border-t border-white/70" />
        </div>
      </div>
      <div className="flex border-b border-[#4b4b4b] bg-[#2b2b2b]">
        {[44, 38, 42].map((width, index) => (
          <div key={index} className={`h-6 border-r border-[#4b4b4b] px-3 ${index === 0 ? "bg-[#424242]" : "bg-[#292929]"}`}>
            <div className="mt-2 h-1.5 rounded bg-white/70" style={{ width }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-b border-[#484848] bg-[#303030] p-2">
        <div className="h-6 flex-1 rounded border border-[#555] bg-[#343434]" />
        <div className="h-6 w-20 rounded border border-[#555] bg-[#3a3a3a]" />
      </div>
      <div className="px-2 py-1 text-center text-[10px] text-white/80">Найдено клипов: 185</div>
      <div className="mx-2 mb-1 h-5 rounded border border-[#4d4d4d] bg-[#303030]" />
      <div className="mx-2 mb-2 flex flex-1 overflow-hidden border border-[#4a4a4a]">
        <div className="w-8 bg-[#383838]" />
        <div className="flex flex-1 flex-col">
          <div className="grid h-6 grid-cols-[.55fr_1fr_1.35fr_.8fr_1fr_.95fr_.9fr] border-b border-[#464646] bg-[#303030]">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="border-r border-[#464646] px-2 pt-2">
                <div className="h-1.5 rounded bg-white/70" />
              </div>
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="grid h-5 grid-cols-[.55fr_1fr_1.35fr_.8fr_1fr_.95fr_.9fr] border-b border-[#3f3f3f] bg-[#262626]">
              <div className="grid place-items-center border-r border-[#3f3f3f]">
                <div className="size-2 bg-[#9511a8]" />
              </div>
              <div className="border-r border-[#3f3f3f] px-2 pt-2">
                <div className="h-1.5 w-10 rounded bg-white/65" />
              </div>
              <div className="border-r border-[#3f3f3f] px-2 pt-2">
                <div className="h-1.5 w-16 rounded bg-white/55" />
              </div>
              <div className="border-r border-[#3f3f3f] px-2 pt-2">
                <div className="h-1.5 w-8 rounded bg-white/65" />
              </div>
              <div className="border-r border-[#3f3f3f] px-2 pt-2">
                <div className="h-1.5 w-12 rounded bg-white/55" />
              </div>
              <div className="grid place-items-center border-r border-[#3f3f3f]">
                <div className="h-3 w-11 rounded bg-[#626262]" />
              </div>
              <div className="grid place-items-center">
                <div className="grid size-3 place-items-center rounded bg-[#69aaf8]">
                  <div className="size-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-5 w-10 items-center justify-end rounded-full bg-[#9633ff] p-0.5 shadow-[0_0_10px_rgba(147,51,255,.55)] ${className}`}>
      <div className="size-4 rounded-full bg-white" />
    </div>
  );
}

function FallbackMockup() {
  return (
    <div className="grid size-32 place-items-center rounded-2xl border border-white/10 bg-white/5">
      <div className="size-16 rounded-full border border-cyan-100/25" />
    </div>
  );
}
