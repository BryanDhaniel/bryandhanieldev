import Image from "next/image";
import Link from "next/link";
import { PiArrowUpRightBold, PiCheckCircleFill } from "react-icons/pi";

import type { Project } from "@/app/data/projects";
import InkReveal from "@/app/components/ui/ink-reveal";

type ProjectCardProps = {
  project: Project;
  className?: string;
  featured?: boolean;
  imageSizes?: string;
  inkReveal?: boolean;
};

export function ProjectCard({
  project,
  className = "",
  featured = false,
  imageSizes = featured ? "(min-width: 1024px) 65vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  inkReveal = false,
}: ProjectCardProps) {
  return (
    <article className={`project-card group overflow-hidden rounded-[1.65rem] border border-black/10 bg-[#f4f1eb] ${className}`}>
      <Link href={`/projects/${project.slug}`} className="block h-full focus-visible:outline-offset-[-5px]">
        <div className={`relative overflow-hidden bg-[#1a1a1a] ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <Image
            src={project.cover}
            alt={`Preview of ${project.title}`}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_35%,rgba(0,0,0,0.62)_100%)]" />
          {inkReveal && <InkReveal className="project-ink-reveal" maskColor={[16, 16, 16]} />}
          <span className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-black/30 text-[10px] font-black text-white backdrop-blur-sm">
            {String(project.order).padStart(2, "0")}
          </span>
          {inkReveal && (
            <span className="project-ink-reveal-hint pointer-events-none absolute right-4 top-4 z-10 items-center rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm sm:right-5 sm:top-5">
              Move to reveal
            </span>
          )}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3 text-white sm:bottom-5 sm:left-5 sm:right-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/65">{project.category} · {project.year}</p>
              <p className="mt-1 text-sm font-bold leading-tight text-white/90">{project.team}</p>
            </div>
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f4f1eb] text-[#101010] transition-transform duration-300 group-hover:-rotate-45"
              style={{ boxShadow: `0 0 0 3px ${project.accent}` }}
            >
              <PiArrowUpRightBold size={17} />
            </span>
          </div>
        </div>
        <div className="flex min-h-48 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black leading-none tracking-[-0.06em] text-[#101010] sm:text-3xl">{project.title}</h3>
              <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-black/65">{project.description}</p>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 pt-4">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-black/60">
              <PiCheckCircleFill style={{ color: project.accent }} size={14} />
              {project.role}
            </span>
            <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.12em] text-[#101010]">View case study</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
