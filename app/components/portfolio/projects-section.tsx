import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import { ProjectCard } from "@/app/components/projects/project-card";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { featuredProjects, projects } from "@/app/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-4 bg-[#f4f1eb] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid items-end gap-8 border-b border-black/15 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:pb-12">
          <SectionMarker number="01" label="Selected work" />
          <div>
            <h2 className="max-w-[11ch] text-[clamp(3rem,7.6vw,7.5rem)] font-black leading-[0.83] tracking-[-0.075em] text-balance">
              Big ideas, made tangible.
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-black/60 sm:text-lg">
              A compact selection from a growing body of product, AI, mobile, and web work. Every project has its own story, role, and process.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-7">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"}
              imageSizes={index === 2 ? "(min-width: 1024px) 100vw, 100vw" : undefined}
              inkReveal={project.slug === "autonomous-lunar-lander"}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-black/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm font-medium leading-relaxed text-black/60 sm:text-base">
            {projects.length} projects and growing — browse the complete collection for product, research, mobile, and interactive work.
          </p>
          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#101010] px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#00ffc6] transition-transform duration-300 hover:-translate-y-0.5"
          >
            View all projects
            <PiArrowRightBold className="transition-transform duration-300 group-hover:translate-x-1" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
