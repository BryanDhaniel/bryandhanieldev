import Link from "next/link";
import { PiArrowRightBold, PiArrowUpRightBold } from "react-icons/pi";
import { ProjectCard } from "@/app/components/projects/project-card";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { projects, selectedProjects } from "@/app/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="grain scroll-mt-4 relative overflow-hidden bg-paper px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="border-b border-ink/15 pb-8">
          <SectionMarker number="01" label="Selected work" accent="#00ffc6" />
          <div className="mt-7 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.82] tracking-[-0.075em] text-balance">
              Big ideas, made tangible.
            </h2>
            <p className="max-w-sm text-base font-medium leading-relaxed text-ink/60 sm:text-lg">
              A compact selection from a growing body of product, AI, mobile, and web work. Every project has its own story, role, and process.
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-12 lg:gap-7">
          {selectedProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              className={index === 0 ? "lg:col-span-8" : index === 1 ? "lg:col-span-4" : "lg:col-span-12"}
              imageSizes={index === 2 ? "(min-width: 1024px) 100vw, 100vw" : undefined}
              // inkReveal={project.slug === "autonomous-lunar-lander"}
            />
          ))}

          <Link
            href="/projects"
            className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-[1.4rem] border border-ink/10 bg-ink p-6 text-paper transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_60px_-28px_rgba(16,16,16,0.6)] sm:p-7 lg:col-span-12"
          >
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/25 blur-3xl transition-transform duration-500 group-hover:scale-125"
            />
            <div className="relative flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-mint">The full archive</span>
              <PiArrowUpRightBold
                size={20}
                className="text-mint transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
            <div className="relative mt-10">
              <p className="max-w-md text-2xl font-black leading-[0.95] tracking-[-0.05em] sm:text-3xl">
                {projects.length} projects and growing. Browse the complete collection.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.12em] text-mint">
                View all projects
                <PiArrowRightBold size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
