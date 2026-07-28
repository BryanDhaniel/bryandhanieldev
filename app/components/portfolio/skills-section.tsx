import { PiCirclesFourBold } from "react-icons/pi";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { IconCloud } from "@/app/components/ui/interactive-icon-cloud";
import { skillGroups, skillCloudIcons, skillCloudLabels } from "@/app/data/skills";

export function SkillsSection() {
  return (
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
  );
}
