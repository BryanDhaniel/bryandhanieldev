import Link from "next/link";
import type { IconType } from "react-icons";
import {
  PiArrowRightBold,
  PiArrowUpBold,
  PiArrowUpRightBold,
  PiBrainBold,
  PiCertificateBold,
  PiCloudArrowUpBold,
  PiCirclesFourBold,
  PiCodeBold,
  PiCursorClickBold,
  PiDatabaseBold,
  PiEnvelopeSimpleBold,
  PiGithubLogoBold,
  PiGlobeHemisphereWestBold,
  PiHeartFill,
  PiInstagramLogoBold,
  PiLinkedinLogoBold,
  PiSparkleFill,
  PiYoutubeLogoBold,
} from "react-icons/pi";
import { ProjectCard } from "@/app/components/projects/project-card";
import { IconCloud } from "@/app/components/ui/interactive-icon-cloud";
import { featuredProjects, projects } from "@/app/data/projects";

const experience = [
  {
    period: "NOW",
    role: "Independent creative developer",
    context: "Selected product and brand collaborations",
    description:
      "Partnering with thoughtful teams to translate a rough idea into a sharp, expressive digital experience.",
    highlights: ["Creative direction through launch", "Design systems that can grow"],
  },
  {
    period: "RECENT",
    role: "Design + engineering collaborator",
    context: "Product-minded teams and founders",
    description:
      "Working at the seam between design intent and real-world implementation, where the most useful details live.",
    highlights: ["Prototypes that make decisions easier", "Interfaces built for actual use"],
  },
  {
    period: "FOUNDATION",
    role: "Visual problem solver",
    context: "Identity, interaction, and digital craft",
    description:
      "Building a practice around taste, systems thinking, and the small movements that make a screen feel alive.",
    highlights: ["Strong visual hierarchy", "Purposeful motion and feedback"],
  },
];

const skillGroups: {
  title: string;
  description: string;
  icon: IconType;
  color: string;
  skills: string[];
}[] = [
  {
    title: "Software engineering",
    description: "Full-stack applications built for clear UX, reliable APIs, and maintainable delivery.",
    icon: PiCodeBold,
    color: "#00ffc6",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "REST APIs"],
  },
  {
    title: "AI engineering",
    description: "Practical machine-learning and LLM features that turn research into useful product experiences.",
    icon: PiBrainBold,
    color: "#ff3366",
    skills: ["Python", "PyTorch", "LLM APIs", "Computer vision", "AI integration"],
  },
  {
    title: "Data + backend",
    description: "Structured data, application logic, and services that give products a dependable core.",
    icon: PiDatabaseBold,
    color: "#d7ff54",
    skills: ["PostgreSQL", "Firebase", "SQL", "Express", "API design"],
  },
  {
    title: "Cloud + delivery",
    description: "A disciplined workflow for versioning, testing, shipping, and improving real software.",
    icon: PiCloudArrowUpBold,
    color: "#a6a6a6",
    skills: ["Git", "GitHub", "Docker", "Vercel", "Testing"],
  },
];

const skillCloudTools = [
  { slug: "typescript", label: "TypeScript" },
  { slug: "javascript", label: "JavaScript" },
  { slug: "react", label: "React" },
  { slug: "nextdotjs", label: "Next.js" },
  { slug: "nodedotjs", label: "Node.js" },
  { slug: "express", label: "Express" },
  { slug: "html5", label: "HTML5" },
  { slug: "css3", label: "CSS3" },
  { slug: "flutter", label: "Flutter" },
  { slug: "dart", label: "Dart" },
  { slug: "firebase", label: "Firebase" },
  { slug: "postgresql", label: "PostgreSQL" },
  { slug: "figma", label: "Figma" },
  { slug: "git", label: "Git" },
  { slug: "github", label: "GitHub" },
  { slug: "vercel", label: "Vercel" },
  { slug: "docker", label: "Docker" },
  { slug: "python", label: "Python" },
  { slug: "pytorch", label: "PyTorch" },
  { slug: "visualstudiocode", label: "VS Code" },
];

const skillCloudIcons = skillCloudTools.map((tool) => tool.slug);
const skillCloudLabels = skillCloudTools.map((tool) => tool.label);

const credentials = [
  {
    index: "01",
    title: "Add your certificate title",
    issuer: "Add issuer / institution",
    date: "Issued — 20XX",
    serial: "Credential ID — add here",
  },
  {
    index: "02",
    title: "Add your certificate title",
    issuer: "Add issuer / institution",
    date: "Issued — 20XX",
    serial: "Credential ID — add here",
  },
  {
    index: "03",
    title: "Add your certificate title",
    issuer: "Add issuer / institution",
    date: "Issued — 20XX",
    serial: "Credential ID — add here",
  },
];

const contactEmail = "hello@bryandhaniel.dev";

const socialLinks: { label: string; href: string; icon: IconType; color: string }[] = [
  {
    label: "GitHub",
    href: "https://github.com/BryanDhaniel",
    icon: PiGithubLogoBold,
    color: "#f4f1eb",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bryan-dhaniel-5b8953258/",
    icon: PiLinkedinLogoBold,
    color: "#00ffc6",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bryandhaniel/",
    icon: PiInstagramLogoBold,
    color: "#ff3366",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCqJwyxrh9hD2FuCREEgVhCg",
    icon: PiYoutubeLogoBold,
    color: "#d7ff54",
  },
];

function SectionMarker({ number, label, dark = false }: { number: string; label: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] sm:text-xs ${
        dark ? "text-white/55" : "text-black/55"
      }`}
    >
      <span className={`grid h-7 w-7 place-items-center rounded-full border ${dark ? "border-white/20" : "border-black/15"}`}>
        {number}
      </span>
      <span>{label}</span>
      <span className={`h-px w-10 ${dark ? "bg-white/20" : "bg-black/15"}`} />
    </div>
  );
}

export function PortfolioSections() {
  return (
    <>
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

      <section id="experience" className="scroll-mt-4 relative overflow-hidden bg-[#101010] px-5 py-20 text-[#f4f1eb] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div aria-hidden="true" className="absolute -right-48 top-0 h-[42rem] w-[42rem] rounded-full bg-[#00ffc6]/10 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-b border-white/15 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:pb-12">
            <SectionMarker number="02" label="Experience" dark />
            <div>
              <h2 className="max-w-[11ch] text-[clamp(3rem,7.6vw,7.5rem)] font-black leading-[0.83] tracking-[-0.075em] text-balance">
                A practice built at the edge of design and code.
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/60 sm:text-lg">
                The best work happens when the concept, the system, and the final interaction all pull in the same direction.
              </p>
            </div>
          </div>

          <div className="relative mt-10 border-t border-white/15 lg:mt-14">
            {experience.map((item, index) => (
              <article key={item.period} className="grid gap-5 border-b border-white/15 py-7 sm:grid-cols-[8.5rem_1fr] sm:py-9 lg:grid-cols-[12rem_minmax(0,1fr)_minmax(16rem,.65fr)] lg:gap-10">
                <div className="flex items-center gap-3 sm:block">
                  <span className="text-3xl font-black tracking-[-0.08em] text-[#00ffc6] sm:text-5xl">0{index + 1}</span>
                  <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.17em] text-white/45">{item.period}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-[-0.055em] sm:text-3xl">{item.role}</h3>
                  <p className="mt-2 text-sm font-bold text-[#d7ff54]">{item.context}</p>
                  <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/60 sm:text-base">{item.description}</p>
                </div>
                <ul className="flex flex-col gap-3 self-end border-l border-white/15 pl-4 text-sm font-medium leading-snug text-white/70">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <PiSparkleFill className="mt-0.5 shrink-0 text-[#ff3366]" size={13} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="scroll-mt-4 bg-[#d8d5d0] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-b border-black/15 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:pb-12">
            <SectionMarker number="03" label="Engineering toolbox" />
            <div>
              <h2 className="max-w-[10ch] text-[clamp(3rem,7.6vw,7.5rem)] font-black leading-[0.83] tracking-[-0.075em] text-balance">
                Software systems and AI, built with intent.
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-black/60 sm:text-lg">
                From full-stack product engineering to machine-learning experiments, I choose tools to make the work useful, reliable, and ready to grow.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article key={group.title} className="group relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-[#f4f1eb] p-5 transition-transform duration-500 hover:-translate-y-1 sm:p-7">
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: group.color }} />
                  <div className="relative flex items-start justify-between gap-5">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#101010]" style={{ color: group.color }}>
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-black tracking-[0.16em] text-black/55">0{index + 1}</span>
                  </div>
                  <div className="relative mt-8">
                    <h3 className="text-2xl font-black tracking-[-0.055em]">{group.title}</h3>
                    <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-black/60">{group.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-black/55">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-5 grid overflow-hidden rounded-[1.5rem] bg-[#101010] text-[#f4f1eb] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,.8fr)]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#00ffc6]">
                <PiCirclesFourBold size={15} />
                Technology orbit
              </div>
              <p className="mt-5 max-w-3xl text-[clamp(1.55rem,3vw,3rem)] font-black leading-[0.94] tracking-[-0.065em]">
                A fluent toolkit, always in motion.
              </p>
              <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/60 sm:text-base">
                Drag the cloud to explore the tools I use across full-stack products, backend systems, mobile apps, and AI experiments.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/55">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">Drag to explore</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">20 tools</span>
              </div>
            </div>
            <div className="relative min-h-[20rem] overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,198,0.18),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(255,51,102,0.2),transparent_32%)] lg:min-h-full lg:border-l lg:border-t-0">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ffc6]/35 shadow-[0_0_65px_rgba(0,255,198,0.25)]" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff3366]/45" />
              <div className="relative z-10 h-full min-h-[20rem]">
                <IconCloud iconSlugs={skillCloudIcons} skillLabels={skillCloudLabels} />
              </div>
              <span className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-white/55 backdrop-blur-sm">
                Interactive toolkit
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="credentials" className="scroll-mt-4 overflow-hidden bg-[#d7ff54] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 border-b border-black/20 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:pb-12">
            <SectionMarker number="04" label="Certificates" />
            <div>
              <h2 className="max-w-[10ch] text-[clamp(3rem,7.6vw,7.5rem)] font-black leading-[0.83] tracking-[-0.075em] text-balance">
                Curiosity, with receipts.
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-black/65 sm:text-lg">
                A ready-to-fill credential ledger for the courses, qualifications, and certifications that matter to your story.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {credentials.map((credential, index) => (
              <article
                key={credential.index}
                className={`relative overflow-hidden rounded-[1.5rem] border border-black/15 bg-[#f4f1eb] p-5 shadow-[0_18px_36px_rgba(16,16,16,0.15)] sm:p-6 ${
                  index === 1 ? "md:-translate-y-5" : index === 2 ? "md:translate-y-3" : ""
                }`}
              >
                <div aria-hidden="true" className="absolute right-[-3.5rem] top-[-3.5rem] h-36 w-36 rounded-full border-[18px] border-[#ff3366]/25" />
                <div className="relative flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#101010] text-[#d7ff54]">
                    <PiCertificateBold size={21} />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.16em] text-black/55">{credential.index}</span>
                </div>
                <div className="relative mt-12">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/60">Credential</p>
                  <h3 className="mt-2 min-h-14 text-2xl font-black leading-[0.95] tracking-[-0.06em]">{credential.title}</h3>
                  <p className="mt-4 text-sm font-bold text-black/60">{credential.issuer}</p>
                </div>
                <div className="relative mt-7 border-t border-black/10 pt-4 text-[10px] font-bold uppercase tracking-[0.11em] text-black/65">
                  <div className="flex justify-between gap-3"><span>Issued</span><span className="text-right text-black/70">{credential.date}</span></div>
                  <div className="mt-2 flex justify-between gap-3"><span>ID</span><span className="text-right text-black/70">{credential.serial}</span></div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-9 flex items-center gap-2 text-xs font-bold text-black/60 sm:mt-12">
            <PiCursorClickBold size={15} />
            Replace each starter card with your real certificate, issuer, issue date, and verification URL.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-mt-4 relative overflow-hidden bg-[#101010] px-5 py-20 text-[#f4f1eb] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div aria-hidden="true" className="absolute -left-32 bottom-[-16rem] h-[34rem] w-[34rem] rounded-full bg-[#ff3366]/35 blur-3xl" />
        <div aria-hidden="true" className="absolute right-[-16rem] top-[-15rem] h-[36rem] w-[36rem] rounded-full bg-[#00ffc6]/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-7">
            <SectionMarker number="05" label="Contact" dark />
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-white/70">
              <span className="h-2 w-2 rounded-full bg-[#00ffc6] shadow-[0_0_10px_#00ffc6]" />
              Open for the right idea
            </span>
          </div>
          <div className="grid gap-10 py-14 lg:grid-cols-[1.35fr_.65fr] lg:py-20">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00ffc6]">A good brief is a great beginning</p>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(3.25rem,8.5vw,8.5rem)] font-black leading-[0.82] tracking-[-0.08em] text-balance">
                Let&apos;s make it <span className="text-[#ff3366]">magnetic.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end">
              <p className="max-w-sm text-base font-medium leading-relaxed text-white/60">
                Have a product, a story, or a strange little idea that needs a home? I would love to hear where you want to take it.
              </p>
              <a href={`mailto:${contactEmail}`} className="group mt-7 flex w-fit items-center gap-3 rounded-full bg-[#f4f1eb] px-5 py-3 text-sm font-black text-[#101010] transition-transform duration-300 hover:-translate-y-1 sm:px-6 sm:py-3.5">
                <PiEnvelopeSimpleBold size={18} />
                {contactEmail}
                <PiArrowUpRightBold className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />
              </a>
              <div className="mt-8 border-t border-white/15 pt-5">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">Find me online</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit Bryan Dhaniel on ${social.label} (opens in a new tab)`}
                        title={social.label}
                        className="group/social grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
                        style={{ color: social.color }}
                      >
                        <Icon className="transition-transform duration-300 group-hover/social:scale-110" size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <footer className="flex flex-col gap-4 border-t border-white/15 pt-6 text-[10px] font-black uppercase tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2"><PiHeartFill className="text-[#ff3366]" /> Designed with intent and a little mischief.</div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><PiGlobeHemisphereWestBold /> Worldwide</span>
              <a href="#top" className="group flex items-center gap-2 text-white transition-colors hover:text-[#00ffc6]">Back to top <PiArrowUpBold className="transition-transform group-hover:-translate-y-0.5" /></a>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
}
