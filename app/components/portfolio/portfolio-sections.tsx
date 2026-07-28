import { ProjectsSection } from "@/app/components/portfolio/projects-section";
import { ExperienceSection } from "@/app/components/portfolio/experience-section";
import { SkillsSection } from "@/app/components/portfolio/skills-section";
// import { CredentialsSection } from "@/app/components/portfolio/credentials-section";
import { ContactSection } from "@/app/components/portfolio/contact-section";

export function PortfolioSections() {
  return (
    <>
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      {/* <CredentialsSection /> */}
      <ContactSection />
    </>
  );
}
