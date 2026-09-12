import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowUpRightBold,
  PiCheckCircleFill,
} from "react-icons/pi";

import { CaseStudyNav, type CaseStudySection } from "@/app/components/projects/case-study-nav";
import { Reveal } from "@/app/components/ui/reveal";
import { ScrollProgress } from "@/app/components/ui/scroll-progress";
import { getProjectBySlug, getProjectNeighbors, projects } from "@/app/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

const caseStudySections: CaseStudySection[] = [
  { id: "overview", label: "Overview" },
  { id: "intent", label: "Why it exists" },
  { id: "contribution", label: "What I owned" },
  { id: "technology", label: "Built with" },
];

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found | Bryan Dhaniel" };
  }

  return {
    title: `${project.title} | Bryan Dhaniel`,
    description: project.description,
    keywords: [project.title, project.category, ...project.stack],
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [{ url: project.cover, width: 1600, height: 1000, alt: `Preview of ${project.title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.cover],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { next } = getProjectNeighbors(project.slug);
  const isRepository = project.link.includes("github.com");
  const projectAction = isRepository ? "View the source" : "Visit the live project";

  const facts = [
    { label: "Year", value: project.year },
    { label: "Format", value: project.category },
    { label: "Team", value: project.team },
    { label: "Role", value: project.role },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    datePublished: project.year,
    genre: project.category,
    keywords: project.stack.join(", "),
    url: project.link,
    image: project.cover,
    creator: { "@type": "Person", name: "Bryan Dhaniel" },
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Scroll-entry animations start hidden, so reveal everything if JS never runs. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html: "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <ScrollProgress accent={project.accent} />

      <nav className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 px-5 py-3 backdrop-blur-lg sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <Link
            href="/projects"
            className="group flex min-w-0 items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.13em] text-ink"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-mint transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6">
              BD
            </span>
            <PiArrowLeftBold
              className="shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5"
              size={14}
            />
            <span className="hidden truncate sm:inline">All projects</span>
          </Link>

          <span className="hidden max-w-[38ch] truncate text-[11px] font-bold tracking-[-0.01em] text-ink/60 md:block">
            {project.title}
          </span>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`${projectAction} (opens in a new tab)`}
              className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink/40 hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <PiArrowUpRightBold size={15} />
            </a>
            <Link
              href="/#contact"
              className="rounded-full bg-ink px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-paper transition-colors duration-300 hover:bg-mint hover:text-ink"
            >
              Say hello
            </Link>
          </div>
        </div>
      </nav>

      <header className="grain relative overflow-hidden px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-52 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{ backgroundColor: project.accent, opacity: 0.16 }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <Reveal className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <span
              className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]"
              style={{ backgroundColor: project.accent, color: "#101010" }}
            >
              {project.category}
            </span>
            <span className="text-[11px] font-bold tracking-[-0.01em] text-ink/60">{project.year}</span>
            <span className="text-[11px] font-bold tracking-[-0.01em] text-ink/60">{project.team}</span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 max-w-[20ch] text-balance text-[clamp(2.5rem,7.4vw,6.75rem)] font-black leading-[0.88] tracking-[-0.06em] lg:mt-9">
              {project.title}
            </h1>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:mt-11 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <Reveal delay={0.16}>
              <p className="max-w-[58ch] text-pretty text-lg font-medium leading-relaxed text-ink/70 sm:text-xl">
                {project.description}
              </p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                <span className="font-semibold text-ink/60">Role</span>
                <span className="font-bold text-ink">{project.role}</span>
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${projectAction} (opens in a new tab)`}
                className="group flex w-fit items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-sm font-black text-paper transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-ink/90 active:scale-[0.98]"
              >
                {projectAction}
                <span
                  className="grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45"
                  style={{ backgroundColor: project.accent, color: "#101010" }}
                >
                  <PiArrowUpRightBold size={16} />
                </span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.3} amount={0.05} className="mt-12 lg:mt-16">
            <figure>
              <div className="rounded-[2rem] bg-ink/[0.05] p-1.5 ring-1 ring-ink/10 sm:p-2">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(2rem-0.5rem)] bg-ink">
                  <Image
                    src={project.cover}
                    alt={`Preview of ${project.title}`}
                    fill
                    preload
                    sizes="(min-width: 1440px) 1400px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_62%,rgba(0,0,0,0.42)_100%)]" />
                </div>
              </div>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 text-[11px] font-medium text-ink/60">
                <span>
                  {project.title} ({project.category}, {project.year})
                </span>
                <span>{project.team}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </header>

      <article className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <CaseStudyNav items={caseStudySections} accent={project.accent} />

            <dl className="mt-9 hidden gap-6 border-t border-ink/10 pt-6 lg:grid">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-medium text-ink/60">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-bold leading-snug tracking-[-0.01em]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <div>
            <section id="overview" className="scroll-mt-28">
              <Reveal>
                <h2 className="text-xl font-black tracking-[-0.03em]">Overview</h2>
                <p className="mt-6 max-w-[24ch] text-balance text-[clamp(1.6rem,3.2vw,2.9rem)] font-black leading-[1.02] tracking-[-0.05em]">
                  {project.overview}
                </p>
              </Reveal>
            </section>

            <section id="intent" className="mt-14 scroll-mt-28 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-14">
              <Reveal>
                <h2 className="text-xl font-black tracking-[-0.03em]">Why it exists</h2>
                <p className="mt-5 max-w-[62ch] text-pretty text-lg font-medium leading-relaxed text-ink/70">
                  {project.purpose}
                </p>
              </Reveal>
            </section>

            <section
              id="contribution"
              className="mt-14 scroll-mt-28 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-14"
            >
              <Reveal>
                <h2 className="text-xl font-black tracking-[-0.03em]">What I owned</h2>
                <div className="relative mt-6 overflow-hidden rounded-[1.5rem] bg-stone/60 p-6 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ backgroundColor: project.accent }}
                  />
                  <PiCheckCircleFill aria-hidden="true" size={20} style={{ color: project.accent }} />
                  <p className="mt-6 max-w-[30ch] text-balance text-2xl font-black leading-[1.06] tracking-[-0.045em] sm:text-[1.75rem]">
                    {project.contribution}
                  </p>
                </div>
              </Reveal>
            </section>

            <section
              id="technology"
              className="mt-14 scroll-mt-28 border-t border-ink/10 pt-12 sm:mt-16 sm:pt-14"
            >
              <Reveal>
                <h2 className="text-xl font-black tracking-[-0.03em]">Built with</h2>
              </Reveal>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.stack.map((tool, index) => (
                  <li key={tool}>
                    <Reveal delay={index * 0.06} amount={0.4}>
                      <div className="flex items-baseline justify-between gap-4 rounded-2xl border border-ink/10 bg-white/50 px-4 py-3.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-ink/25 hover:bg-white">
                        <span className="text-sm font-bold tracking-[-0.01em]">{tool}</span>
                        <span className="font-mono text-[10px] tabular-nums text-ink/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>

      <section className="relative overflow-hidden bg-ink px-5 py-16 text-paper sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full blur-3xl"
          style={{ backgroundColor: project.accent, opacity: 0.14 }}
        />
        <div className="relative mx-auto grid max-w-[1400px] gap-4 md:grid-cols-2">
          <Reveal amount={0.3}>
            <Link
              href="/projects"
              className={`group flex h-full flex-col justify-between gap-10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] sm:p-9 ${
                next ? "" : "md:col-span-2"
              }`}
            >
              <div className="flex items-start justify-between gap-6">
                <p className="text-xs font-semibold text-white/55">Project archive</p>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-1">
                  <PiArrowLeftBold size={18} />
                </span>
              </div>
              <h2 className="text-balance text-3xl font-black leading-[1.02] tracking-[-0.05em] sm:text-4xl">
                Browse every project.
              </h2>
            </Link>
          </Reveal>

          {next && (
            <Reveal delay={0.08} amount={0.3}>
              <Link
                href={`/projects/${next.slug}`}
                className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] border border-white/10 p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/25 sm:p-9"
              >
                <Image
                  src={next.cover}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-[0.14] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(155deg,rgba(16,16,16,0.95)_30%,rgba(16,16,16,0.72)_100%)]"
                />
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold text-white/55">Next project</p>
                    <p className="mt-1.5 text-[11px] font-bold tracking-[-0.01em] text-white/55">
                      {next.category}, {next.year}
                    </p>
                  </div>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                    style={{ backgroundColor: next.accent }}
                  >
                    <PiArrowRightBold size={18} />
                  </span>
                </div>
                <h2 className="relative text-balance text-3xl font-black leading-[1.02] tracking-[-0.05em] sm:text-4xl">
                  {next.title}
                </h2>
              </Link>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
