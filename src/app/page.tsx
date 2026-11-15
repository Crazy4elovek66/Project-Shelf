import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AiConsoleSection } from "@/components/AiConsoleSection";
import { WorkProcessSection } from "@/components/WorkProcessSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CommandPaletteModal } from "@/components/CommandPaletteModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CapabilitiesSection />
        <ProjectsSection />
        <AiConsoleSection />
        <WorkProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <CommandPaletteModal />
    </>
  );
}
