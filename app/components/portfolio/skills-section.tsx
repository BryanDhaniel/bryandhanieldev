"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PiCirclesFourBold } from "react-icons/pi";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { IconCloud } from "@/app/components/ui/interactive-icon-cloud";
import { skillGroups, skillCloudIcons, skillCloudLabels } from "@/app/data/skills";

export function SkillsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Header + orbit panel: spring-driven fade/scale, disabled to a plain fade if the
  // user prefers reduced motion.
  const fadeUp: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 90, damping: 16, mass: 0.7 },
        },
      };

  const cardGrid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  const cardItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 32, scale: 0.94 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 130, damping: 15, mass: 0.6 },
        },
      };

  // Inner content of each card staggers in a beat after the card itself lands.
  const cardInner: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const cardInnerItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      };

  const tagContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } },
  };

  const tagItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
      };

  const ring: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.6 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { type: "spring", stiffness: 70, damping: 14, delay: 0.15 },
        },
      };

  return (
    <section id="skills" className="scroll-mt-4 bg-[#d8d5d0] px-5 py-20 text-[#101010] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-350">
        <motion.div
          className="grid gap-8 border-b border-black/15 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:pb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionMarker number="03" label="Engineering toolbox" />
          <div>
            <h2 className="max-w-[10ch] text-[clamp(3rem,7.6vw,7.5rem)] font-black leading-[0.83] tracking-[-0.075em] text-balance">
              Software systems and AI, built with intent.
            </h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-black/60 sm:text-lg">
              From full-stack product engineering to machine-learning experiments, I choose tools to make the work useful, reliable, and ready to grow.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={cardGrid}
        >
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article
                key={group.title}
                variants={cardItem}
                whileHover={shouldReduceMotion ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-3xl border border-black/10 bg-[#f4f1eb] p-5 sm:p-7"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-2xl transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: group.color }} />
                <motion.div variants={cardInner} className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <motion.div
                      variants={cardInnerItem}
                      whileHover={shouldReduceMotion ? undefined : { rotate: 8, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="grid h-11 w-11 place-items-center rounded-2xl bg-[#101010]"
                      style={{ color: group.color }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <motion.span variants={cardInnerItem} className="text-[10px] font-black tracking-[0.16em] text-black/55">
                      0{index + 1}
                    </motion.span>
                  </div>
                  <div className="mt-8">
                    <motion.h3 variants={cardInnerItem} className="text-2xl font-black tracking-[-0.055em]">
                      {group.title}
                    </motion.h3>
                    <motion.p variants={cardInnerItem} className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-black/60">
                      {group.description}
                    </motion.p>
                    <motion.div variants={tagContainer} className="mt-6 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={tagItem}
                          className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-black/55"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-5 grid overflow-hidden rounded-3xl bg-[#101010] text-[#f4f1eb] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,.8fr)]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
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
          <div className="relative min-h-80 overflow-hidden border-t border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,198,0.18),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(255,51,102,0.2),transparent_32%)] lg:min-h-full lg:border-l lg:border-t-0">
            <motion.div
              aria-hidden="true"
              variants={ring}
              className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ffc6]/35 shadow-[0_0_65px_rgba(0,255,198,0.25)]"
            />
            <motion.div
              aria-hidden="true"
              variants={ring}
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff3366]/45"
            />
            <div className="relative z-10 h-full min-h-80">
              <IconCloud iconSlugs={skillCloudIcons} skillLabels={skillCloudLabels} />
            </div>
            <span className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-white/55 backdrop-blur-sm">
              Interactive toolkit
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}