import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { KineticMarquee } from "@/components/KineticMarquee";
import { ProjectPreviewStrip } from "@/components/ProjectPreviewStrip";
import { EngineeringBaseSection } from "@/components/EngineeringBaseSection";
import { ProjectsTerminalSection } from "@/components/ProjectsTerminalSection";
import { AiConsoleSection } from "@/components/AiConsoleSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
