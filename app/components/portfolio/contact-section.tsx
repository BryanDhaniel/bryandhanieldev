"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  PiArrowUpBold,
  PiArrowUpRightBold,
  PiEnvelopeSimpleBold,
  PiGlobeHemisphereWestBold,
  PiHeartFill,
} from "react-icons/pi";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { contactEmail, socialLinks } from "@/app/data/contact";

export function ContactSection() {
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

  const socialGrid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
  };

  const socialItem: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.6, y: 8 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 18 } },
      };

  const footerReveal: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section id="contact" className="scroll-mt-4 relative overflow-hidden bg-[#101010] px-5 py-12 text-[#f4f1eb] sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <style>{`
        @keyframes cs-heartbeat {
          0%, 100% { transform: scale(1); }
          18% { transform: scale(1.2); }
          36% { transform: scale(0.95); }
          54% { transform: scale(1.1); }
          72% { transform: scale(1); }
        }
        @keyframes cs-globe-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cs-shimmer {
          0%, 100% { background-position: -160% 0; }
          50% { background-position: 160% 0; }
        }
        .cs-heartbeat {
          display: inline-flex;
          transform-origin: center;
          animation: cs-heartbeat 3.2s ease-in-out infinite;
        }
        .cs-globe {
          display: inline-flex;
          animation: cs-globe-spin 10s linear infinite;
        }
        .cs-shimmer-line {
          background-image: linear-gradient(90deg, transparent, rgba(255, 51, 102, 0.7), rgba(0, 255, 198, 0.7), transparent);
          background-size: 220% 100%;
          animation: cs-shimmer 7s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-heartbeat,
          .cs-globe,
          .cs-shimmer-line {
            animation: none;
          }
        }
      `}</style>
      <div aria-hidden="true" className="absolute -left-24 -bottom-48 h-96 w-96 rounded-full bg-[#ff3366]/35 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-48 -top-44 h-104 w-xl rounded-full bg-[#00ffc6]/20 blur-3xl" />
      <div className="relative mx-auto max-w-350">
        <motion.div
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-7"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <SectionMarker number="05" label="Contact" dark />
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ffc6] shadow-[0_0_10px_#00ffc6]" />
            Open for the right idea
          </span>
        </motion.div>
        <motion.div
          className="grid gap-6 py-8 lg:grid-cols-[1.35fr_.65fr] lg:py-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00ffc6]">A good brief is a great beginning</p>
            <h2 className="mt-3 max-w-[12ch] text-[clamp(2.25rem,6vw,5rem)] font-black leading-[0.85] tracking-[-0.06em] text-balance">
              Contact <span className="text-[#ff3366]">Me.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-sm text-sm font-medium leading-relaxed text-white/60">
              Have a product, a story, or a strange little idea that needs a home? I would love to hear where you want to take it.
            </p>
            <motion.a
              href={`mailto:${contactEmail}`}
              whileHover={shouldReduceMotion ? undefined : { y: -4 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="group mt-5 flex w-fit items-center gap-3 rounded-full bg-[#f4f1eb] px-5 py-2.5 text-sm font-black text-[#101010] hover:shadow-[0_10px_36px_-10px_#00ffc6] sm:px-6 sm:py-3"
            >
              <PiEnvelopeSimpleBold size={18} />
              {contactEmail}
              <PiArrowUpRightBold className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />
            </motion.a>
            <div className="mt-5 border-t border-white/15 pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/45">Find me online</p>
              <motion.div
                className="mt-3 flex flex-wrap gap-2.5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                variants={socialGrid}
              >
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit Bryan Dhaniel on ${social.label} (opens in a new tab)`}
                      title={social.label}
                      variants={socialItem}
                      whileHover={shouldReduceMotion ? undefined : { y: -4, rotate: 6 }}
                      whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="group/social grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors duration-300 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ color: social.color }}
                    >
                      <Icon className="transition-transform duration-300 group-hover/social:scale-110" size={18} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.footer
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={footerReveal}
          className="relative flex flex-col gap-3 border-t border-white/15 pt-4 text-[10px] font-black uppercase tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between"
        >
          <span aria-hidden="true" className="cs-shimmer-line absolute inset-x-0 -top-px h-px" />
          <div className="flex items-center gap-2">
            <PiHeartFill className="cs-heartbeat text-[#ff3366]" /> Designed with intent and a little mischief.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <PiGlobeHemisphereWestBold className="cs-globe" /> BryanDhaniel
            </span>
            <a
              href="#top"
              className="group/top relative flex items-center gap-2 overflow-hidden rounded-full px-3 py-1.5 text-white transition-colors duration-300 hover:text-[#101010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ffc6]"
            >
              <span aria-hidden="true" className="absolute inset-0 z-0 -translate-x-full rounded-full bg-[#00ffc6] transition-transform duration-300 ease-out group-hover/top:translate-x-0" />
              <span className="relative z-10 flex items-center gap-2">
                Back to top <PiArrowUpBold className="transition-transform duration-300 group-hover/top:-translate-y-1" />
              </span>
            </a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}