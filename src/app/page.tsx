import { HeroSection }           from "@/components/sections/HeroSection";
import { AboutSection }          from "@/components/sections/AboutSection";
import { JourneySection }        from "@/components/sections/JourneySection";
import { ProjectsSection }       from "@/components/sections/ProjectsSection";
import { AgentsSection }         from "@/components/sections/AgentsSection";
import { SkillsSection }         from "@/components/sections/SkillsSection";
import { SpeakerSection }        from "@/components/sections/SpeakerSection";
import { AchievementsSection }   from "@/components/sections/AchievementsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection }        from "@/components/sections/ContactSection";
import { Footer }                from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#030014]">
      {/* Fixed ambient blobs — behind everything, never affect layout */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-pink-500/[0.02] rounded-full blur-[150px]" />
      </div>

      <HeroSection />
      <AboutSection />
      <JourneySection />
      <ProjectsSection />
      <AgentsSection />
      <SkillsSection />
      <SpeakerSection />
      <AchievementsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
