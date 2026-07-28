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
  return (
    <section id="contact" className="scroll-mt-4 relative overflow-hidden bg-[#101010] px-5 py-20 text-[#f4f1eb] sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div aria-hidden="true" className="absolute -left-32 -bottom-64 h-136 w-136 rounded-full bg-[#ff3366]/35 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-64 -top-60 h-144 w-xl rounded-full bg-[#00ffc6]/20 blur-3xl" />
      <div className="relative mx-auto max-w-350">
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
  );
}
