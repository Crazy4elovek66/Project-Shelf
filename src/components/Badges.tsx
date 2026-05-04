import type { ProjectStatus } from "@/data/projects";

const statusStyles: Record<ProjectStatus, string> = {
  Готово: "border-emerald-300/35 bg-emerald-300/10 text-emerald-100",
  MVP: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  "В разработке": "border-violet-300/35 bg-violet-300/10 text-violet-100",
  "Технический эксперимент": "border-amber-300/35 bg-amber-300/10 text-amber-100",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

export function TechBadge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}
