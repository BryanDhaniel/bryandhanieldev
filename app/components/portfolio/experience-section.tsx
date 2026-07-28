import { PiSparkleFill } from "react-icons/pi";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { experience } from "@/app/data/experience";

export function ExperienceSection() {
  return (
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
  );
}
