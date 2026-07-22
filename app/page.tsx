import { PortfolioSections } from "@/app/components/portfolio/portfolio-sections";
import { RobotHero } from "@/app/components/ui/robot-hero";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101010]">
      <RobotHero
        backgroundText="BRYANDEV"
        navItemsLeft={[
          { label: "Projects", href: "/projects" },
          { label: "Experience", href: "#experience" },
          { label: "Skills", href: "#skills" },
          { label: "Certificates", href: "#credentials" },
        ]}
        contactText="Say hello"
        contactHref="#contact"
        ctaText="View work"
        ctaHref="/projects"
        heroEyebrow="SOFTWARE ENGINEER / AI ENGINEER"
        heroDescription="I engineer software and AI-driven systems, always chasing the how and why behind every problem."
        availabilityText="Open to thoughtful collaborations"
        scrollHref="#projects"
      />
      <PortfolioSections />
    </main>
  );
}
