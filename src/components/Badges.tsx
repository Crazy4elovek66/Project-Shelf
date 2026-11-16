import type { ProjectStatus } from "@/data/projects";

const statusStyles: Record<ProjectStatus, string> = {
  Готово: "border-white/30 bg-white/10 text-white font-bold",
  MVP: "border-white/20 bg-white/[0.06] text-zinc-200",
  "В разработке": "border-white/15 bg-white/[0.03] text-zinc-400",
  "Технический эксперимент": "border-white/15 bg-white/[0.03] text-zinc-400",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`rounded border px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

export function TechBadge({ children }: { children: string }) {
  return (
    <span className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-zinc-300">
      {children}
    </span>
  );
}
