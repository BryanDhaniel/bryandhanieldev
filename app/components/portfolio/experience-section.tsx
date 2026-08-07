"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { PiSparkleFill, PiCaretDownBold, PiMapPinFill } from "react-icons/pi";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { experience } from "@/app/data/experience";

export function ExperienceSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 32, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 90, damping: 16, mass: 0.7 },
        },
      };

  const rowList: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const rowItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 18, mass: 0.6 } },
      };

  return (
    <section
      id="experience"
      className="scroll-mt-4 relative overflow-hidden bg-[#101010] px-5 py-20 text-[#f4f1eb] sm:px-8 sm:py-28 lg:px-12 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="absolute -right-48 top-0 h-168 w-2xl rounded-full bg-[#00ffc6]/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-350">
        <motion.div
          className="grid gap-8 border-b border-white/15 pb-9 lg:grid-cols-[0.7fr_1.3fr] lg:pb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionMarker number="02" label="Experience" dark />
          <div>
            <h2 className="max-w-[14ch] text-[clamp(2.5rem,6.2vw,6rem)] font-black leading-[0.9] tracking-[-0.06em] text-balance">
              &quot;{" "}The only source of knowledge is{" "}
              <span className="text-[#00ffc6]">experience.</span>&quot;
            </h2>
            <p className="mt-6 flex items-center gap-3 text-xs font-black uppercase tracking-[0.17em] text-white/45">
              <span className="h-px w-8 bg-white/25" />
              Albert Einstein
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-10 border-t border-white/15 lg:mt-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={rowList}
        >
          {experience.map((item, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, "0");

            return (
              <motion.article
                key={`${item.role}-${item.period}`}
                variants={rowItem}
                className="group/row relative border-b border-white/15"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-2 right-0 select-none text-[6.5rem] font-black leading-none tracking-[-0.06em] transition-all duration-500 ease-out motion-reduce:transition-none sm:text-[9rem] lg:-top-6 lg:text-[12rem] ${
                    isOpen
                      ? "text-[#00ffc6] opacity-100"
                      : "text-transparent opacity-50 [-webkit-text-stroke:1px_rgba(244,241,235,0.22)] group-hover/row:opacity-75"
                  }`}
                >
                  {number}
                </span>

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`experience-panel-${index}`}
                  className="group relative z-10 flex w-full items-start justify-between gap-6 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ffc6] sm:py-9"
                >
                  <span className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.17em] text-white/45">
                      {item.period}
                    </span>
                    <span
                      className={`font-black tracking-[-0.055em] transition-[color,font-size] duration-500 ease-out motion-reduce:transition-colors ${
                        isOpen
                          ? "text-[clamp(1.5rem,4vw,3rem)] text-[#00ffc6]"
                          : "text-lg text-[#f4f1eb] group-hover:text-[#00ffc6] sm:text-xl"
                      }`}
                    >
                      {item.role}
                    </span>
                    <span className="text-sm font-bold text-[#d7ff54]">{item.organization}</span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-white/45">
                      <PiMapPinFill aria-hidden="true" size={12} className="shrink-0 text-white/35" />
                      {item.location}
                    </span>
                  </span>

                  <PiCaretDownBold
                    aria-hidden="true"
                    size={18}
                    className={`mt-2 shrink-0 text-white/50 transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "rotate-180 text-[#00ffc6]" : ""
                    }`}
                  />
                </button>

                <div
                  id={`experience-panel-${index}`}
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <div className="min-h-0">
                    <div className="grid gap-6 pb-9 sm:grid-cols-[1fr_minmax(16rem,.6fr)] sm:pb-11 lg:gap-10">
                      <p
                        className="max-w-xl text-sm font-medium leading-relaxed text-white/60 transition-all duration-500 ease-out motion-reduce:transition-none sm:text-base"
                        style={{
                          transitionDelay: isOpen ? "80ms" : "0ms",
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "translateY(0)" : "translateY(6px)",
                        }}
                      >
                        {item.description}
                      </p>
                      <ul
                        className="flex flex-col gap-3 border-l border-white/15 pl-4 text-sm font-medium leading-snug text-white/70 transition-all duration-500 ease-out motion-reduce:transition-none"
                        style={{
                          transitionDelay: isOpen ? "160ms" : "0ms",
                          opacity: isOpen ? 1 : 0,
                          transform: isOpen ? "translateY(0)" : "translateY(6px)",
                        }}
                      >
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <PiSparkleFill aria-hidden="true" className="mt-0.5 shrink-0 text-[#ff3366]" size={13} />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}