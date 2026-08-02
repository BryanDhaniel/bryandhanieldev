"use client";

import { useEffect, useRef, useState } from "react";
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
  const footerRef = useRef<HTMLElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="scroll-mt-4 relative overflow-hidden bg-[#101010] px-5 py-20 text-[#f4f1eb] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
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
      <div aria-hidden="true" className="absolute -left-32 -bottom-64 h-136 w-136 rounded-full bg-[#ff3366]/35 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-64 -top-60 h-144 w-xl rounded-full bg-[#00ffc6]/20 blur-3xl" />
      <div className="relative mx-auto max-w-350">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-7">
          <SectionMarker number="05" label="Contact" dark />
          <span className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-white/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00ffc6] shadow-[0_0_10px_#00ffc6]" />
            Open for the right idea
          </span>
        </div>
        <div className="grid gap-10 py-14 lg:grid-cols-[1.35fr_.65fr] lg:py-20">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00ffc6]">A good brief is a great beginning</p>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(3.25rem,8.5vw,8.5rem)] font-black leading-[0.82] tracking-[-0.08em] text-balance">
              Contact <span className="text-[#ff3366]">Me.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-sm text-base font-medium leading-relaxed text-white/60">
              Have a product, a story, or a strange little idea that needs a home? I would love to hear where you want to take it.
            </p>
            <a href={`mailto:${contactEmail}`} className="group mt-7 flex w-fit items-center gap-3 rounded-full bg-[#f4f1eb] px-5 py-3 text-sm font-black text-[#101010] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_36px_-10px_#00ffc6] sm:px-6 sm:py-3.5">
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
                      className="group/social grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:rotate-6 hover:border-white/40 hover:bg-white/10 focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
        <footer
          ref={footerRef}
          className={`relative flex flex-col gap-4 border-t border-white/15 pt-6 text-[10px] font-black uppercase tracking-[0.14em] text-white/45 transition-all duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none sm:flex-row sm:items-center sm:justify-between ${
            footerVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
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
        </footer>
      </div>
    </section>
  );
}