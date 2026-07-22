import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowUpRightBold,
  PiCheckCircleFill,
  PiCompassBold,
  PiLinkSimpleBold,
  PiStackBold,
} from "react-icons/pi";

import { getProjectBySlug, getProjectNeighbors, projects } from "@/app/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found — Bryan Dhaniel" };
  }

  return {
    title: `${project.title} — Bryan Dhaniel`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { next } = getProjectNeighbors(project.slug);

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#101010]">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#101010]/95 px-5 py-3 text-[#f4f1eb] backdrop-blur-lg sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <Link href="/projects" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.13em] text-white/80 transition-colors hover:text-[#00ffc6]">
            <PiArrowLeftBold className="transition-transform duration-300 group-hover:-translate-x-0.5" size={14} />
            <span className="hidden sm:inline">All projects</span>
            <span className="sm:hidden">Archive</span>
          </Link>
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">
            {String(project.order).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <Link href="/#contact" className="rounded-full bg-[#f4f1eb] px-3 py-2 text-[10px] font-black uppercase tracking-[0.11em] text-[#101010] transition-colors hover:bg-[#00ffc6] sm:px-4">
            Say hello
          </Link>
        </div>
      </nav>

      <header className="relative overflow-hidden bg-[#101010] px-5 pb-12 pt-14 text-[#f4f1eb] sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-28">
        <div aria-hidden="true" className="absolute -right-40 -top-44 h-[35rem] w-[35rem] rounded-full blur-3xl" style={{ backgroundColor: project.accent, opacity: 0.23 }} />
        <div aria-hidden="true" className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5" style={{ color: project.accent }}>{project.category}</span>
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-[#ff3366]" />
            <span>{project.team}</span>
          </div>
          <div className="mt-9 grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <h1 className="max-w-[9ch] text-[clamp(3.75rem,9vw,9.5rem)] font-black leading-[0.78] tracking-[-0.085em] text-balance">{project.title}</h1>
              <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-white/65 sm:text-xl">{project.description}</p>
            </div>
            <div className="flex flex-col gap-4 border-l border-white/15 pl-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 lg:flex-col lg:items-start lg:justify-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/45">My role</p>
                <p className="mt-2 max-w-xs text-lg font-black leading-tight tracking-[-0.035em]">{project.role}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${project.title} (opens in a new tab)`}
                className="group flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#101010] transition-transform hover:-translate-y-1"
                style={{ backgroundColor: project.accent }}
              >
                Visit project
                <PiArrowUpRightBold className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={15} />
              </a>
            </div>
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 shadow-[0_28px_80px_rgba(0,0,0,0.3)] lg:mt-16">
            <div className="relative aspect-[16/10]">
              <Image
                src={project.cover}
                alt={`Preview of ${project.title}`}
                fill
                preload
                sizes="(min-width: 1440px) 1400px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.5)_100%)]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
                <span className="rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-white backdrop-blur-sm">Project preview</span>
                <span className="text-[10px] font-black uppercase tracking-[0.13em] text-white/70">{String(project.order).padStart(2, "0")} / {project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/45">Project map</p>
            <nav className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
              {[
                ["Overview", "overview"],
                ["Why it exists", "intent"],
                ["Contribution", "contribution"],
                ["Technology", "technology"],
              ].map(([label, id]) => (
                <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-black/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.11em] text-black/60 transition-colors hover:border-[#101010] hover:text-[#101010] lg:border-0 lg:px-0 lg:py-1.5">
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-8 hidden rounded-2xl border border-black/10 bg-[#d8d5d0] p-4 lg:block">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/45">Snapshot</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div><dt className="text-[10px] font-black uppercase tracking-[0.12em] text-black/45">Year</dt><dd className="mt-1 font-bold">{project.year}</dd></div>
                <div><dt className="text-[10px] font-black uppercase tracking-[0.12em] text-black/45">Format</dt><dd className="mt-1 font-bold">{project.category}</dd></div>
                <div><dt className="text-[10px] font-black uppercase tracking-[0.12em] text-black/45">Team</dt><dd className="mt-1 font-bold leading-snug">{project.team}</dd></div>
              </dl>
            </div>
          </aside>

          <div>
            <section id="overview" className="scroll-mt-28 border-b border-black/10 pb-12 sm:pb-16">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: project.accent }}>
                <PiCompassBold size={15} />
                Overview
              </div>
              <p className="mt-5 max-w-3xl text-[clamp(1.7rem,3.5vw,3.5rem)] font-black leading-[0.94] tracking-[-0.065em]">{project.overview}</p>
            </section>

            <section id="intent" className="scroll-mt-28 border-b border-black/10 py-12 sm:py-16">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/45">Why it exists</p>
              <div className="mt-5 grid gap-6 sm:grid-cols-[.28fr_.72fr]">
                <div className="text-5xl font-black tracking-[-0.08em]" style={{ color: project.accent }}>02</div>
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-black/70 sm:text-xl">{project.purpose}</p>
              </div>
            </section>

            <section id="contribution" className="scroll-mt-28 border-b border-black/10 py-12 sm:py-16">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/45">My contribution</p>
              <div className="mt-5 rounded-[1.5rem] bg-[#101010] p-6 text-[#f4f1eb] sm:p-9">
                <PiCheckCircleFill size={22} style={{ color: project.accent }} />
                <p className="mt-7 max-w-2xl text-2xl font-black leading-[0.98] tracking-[-0.055em] sm:text-3xl">{project.contribution}</p>
              </div>
            </section>

            <section id="technology" className="scroll-mt-28 py-12 sm:py-16">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-black/45">
                <PiStackBold size={15} />
                Technology & tools
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.stack.map((tool) => (
                  <span key={tool} className="rounded-full border border-black/15 bg-white px-4 py-2.5 text-xs font-bold text-black/70">{tool}</span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.title} (opens in a new tab)`}
                className="group mt-9 inline-flex items-center gap-2 text-sm font-black text-[#101010] underline decoration-2 underline-offset-6 transition-colors hover:text-[#ff3366]"
              >
                <PiLinkSimpleBold size={18} />
                Open the live project or source
                <PiArrowUpRightBold className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />
              </a>
            </section>
          </div>
        </div>
      </article>

      <section className="border-t border-black/10 bg-[#d8d5d0] px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] gap-4 md:grid-cols-2">
          <Link
            href="/projects"
            className={`group rounded-[1.5rem] border border-black/10 bg-[#f4f1eb] p-6 transition-transform hover:-translate-y-1 sm:p-8 ${
              next ? "" : "md:col-span-2"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/45">Project archive</p>
            <div className="mt-7 flex items-end justify-between gap-5">
              <h2 className="max-w-[10ch] text-3xl font-black leading-[0.9] tracking-[-0.065em]">Browse every project.</h2>
              <PiArrowLeftBold className="transition-transform duration-300 group-hover:-translate-x-1" size={20} />
            </div>
          </Link>
          {next && (
            <Link href={`/projects/${next.slug}`} className="group relative overflow-hidden rounded-[1.5rem] bg-[#101010] p-6 text-[#f4f1eb] transition-transform hover:-translate-y-1 sm:p-8">
              <div aria-hidden="true" className="absolute -right-10 -top-10 h-44 w-44 rounded-full blur-3xl" style={{ backgroundColor: next.accent, opacity: 0.45 }} />
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/50">Next project · {String(next.order).padStart(2, "0")}</p>
                <div className="mt-7 flex items-end justify-between gap-5">
                  <h2 className="max-w-[11ch] text-3xl font-black leading-[0.9] tracking-[-0.065em]">{next.title}</h2>
                  <PiArrowRightBold className="transition-transform duration-300 group-hover:translate-x-1" size={20} />
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
