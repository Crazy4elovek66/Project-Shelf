import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { KineticMarquee } from "@/components/KineticMarquee";
import { ProjectPreviewStrip } from "@/components/ProjectPreviewStrip";
import { EngineeringBaseSection } from "@/components/EngineeringBaseSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

// Dynamic imports with SSR for below-the-fold sections
const ProjectsTerminalSection = dynamic(
  () => import("@/components/ProjectsTerminalSection").then((m) => m.ProjectsTerminalSection)
);

const AiConsoleSection = dynamic(
  () => import("@/components/AiConsoleSection").then((m) => m.AiConsoleSection)
);

const CommandPaletteModal = dynamic(
  () => import("@/components/CommandPaletteModal").then((m) => m.CommandPaletteModal)
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
        <ProjectsTerminalSection />

        {/* 6. AiConsoleSection */}
        <AiConsoleSection />

        {/* 7. ContactSection */}
        <ContactSection />
      </main>
      {/* 8. Footer */}
      <Footer />
      <ScrollToTop />
      <CommandPaletteModal />
    </>
  );
}
