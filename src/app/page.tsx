import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { KineticMarquee } from "@/components/KineticMarquee";
import { ProjectPreviewStrip } from "@/components/ProjectPreviewStrip";
import { EngineeringBaseSection } from "@/components/EngineeringBaseSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CommandPaletteLauncher } from "@/components/CommandPaletteLauncher";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";

// Dynamic imports with SSR and height reservation to prevent CLS
const ProjectsTerminalSection = dynamic(
  () => import("@/components/ProjectsTerminalSection").then((m) => m.ProjectsTerminalSection),
  { loading: () => <div className="min-h-[820px] border-b border-white/10" aria-hidden="true" /> }
);

const AiConsoleSection = dynamic(
  () => import("@/components/AiConsoleSection").then((m) => m.AiConsoleSection),
  { loading: () => <div className="min-h-[760px] border-b border-white/10" aria-hidden="true" /> }
);

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        {/* 1. HeroSection */}
        <HeroSection />

        {/* 2. KineticMarquee */}
        <KineticMarquee />

        {/* 3. ProjectPreviewStrip */}
        <ProjectPreviewStrip />

        {/* 4. EngineeringBaseSection */}
        <EngineeringBaseSection />

        {/* 5. ProjectsTerminalSection */}
        <SectionErrorBoundary sectionName="ProjectsTerminal">
          <ProjectsTerminalSection />
        </SectionErrorBoundary>

        {/* 6. AiConsoleSection */}
        <SectionErrorBoundary sectionName="AiConsole">
          <AiConsoleSection />
        </SectionErrorBoundary>

        {/* 7. ContactSection */}
        <ContactSection />
      </main>
      {/* 8. Footer */}
      <Footer />
      <ScrollToTop />
      <CommandPaletteLauncher />
    </>
  );
}
