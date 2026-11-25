"use client";

import React from "react";

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  sectionName?: string;
}

interface SectionErrorBoundaryState {
  hasError: boolean;
}

export class SectionErrorBoundary extends React.Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[SectionErrorBoundary:${this.props.sectionName || "unknown"}]`, error);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback !== undefined) {
        return this.props.fallback;
      }
      return (
        <div className="section-shell my-8 rounded-xl border border-white/15 bg-[#09090C] p-6 font-mono text-xs text-zinc-400">
          <div className="flex items-center justify-between gap-4">
            <span>[WARN] Модуль {this.props.sectionName || "секции"} временно недоступен на этом устройстве.</span>
            <button
              type="button"
              onClick={() => this.setState({ hasError: false })}
              className="rounded border border-white/20 bg-white/5 px-3 py-1.5 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              ПОВТОРИТЬ
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
