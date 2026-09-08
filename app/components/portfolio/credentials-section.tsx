import { PiCertificateBold, PiCursorClickBold } from "react-icons/pi";
import { SectionMarker } from "@/app/components/ui/section-marker";
import { credentials } from "@/app/data/credentials";

/**
 * Credentials section — currently commented out in the main layout.
 * Uncomment the usage in portfolio-sections.tsx when ready to display.
 */
export function CredentialsSection() {
  return (
    <section id="credentials" className="grain scroll-mt-4 relative overflow-hidden bg-stone px-5 py-20 text-ink sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <header className="border-b border-ink/15 pb-9 lg:pb-12">
          <SectionMarker number="04" label="Certificates" accent="#d7ff54" />
          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[16ch] text-[clamp(3rem,7.6vw,7.5rem)] font-black leading-[0.82] tracking-[-0.075em] text-balance">
              Curiosity, with receipts.
            </h2>
            <p className="max-w-sm text-base font-medium leading-relaxed text-ink/60 sm:text-lg">
              A ready-to-fill credential ledger for the courses, qualifications, and certifications that matter to your story.
            </p>
          </div>
        </header>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
          {credentials.map((credential, index) => (
            <article
              key={credential.index}
              className={`relative overflow-hidden rounded-[1.5rem] border border-ink/15 bg-paper p-5 shadow-[0_18px_36px_-22px_rgba(16,16,16,0.5)] sm:p-6 ${
                index === 1 ? "md:-translate-y-5" : index === 2 ? "md:translate-y-3" : ""
              }`}
            >
              <div aria-hidden="true" className="absolute right-[-3.5rem] top-[-3.5rem] h-36 w-36 rounded-full border-[18px] border-rose/25" />
              <div className="relative flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-lime">
                  <PiCertificateBold size={21} />
                </div>
                <span className="text-[10px] font-black tracking-[0.16em] text-ink/55">{credential.index}</span>
              </div>
              <div className="relative mt-12">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-ink/60">Credential</p>
                <h3 className="mt-2 min-h-14 text-2xl font-black leading-[0.95] tracking-[-0.06em]">{credential.title}</h3>
                <p className="mt-4 text-sm font-bold text-ink/60">{credential.issuer}</p>
              </div>
              <div className="relative mt-7 border-t border-ink/10 pt-4 text-[10px] font-bold uppercase tracking-[0.11em] text-ink/65">
                <div className="flex justify-between gap-3"><span>Issued</span><span className="text-right text-ink/70">{credential.date}</span></div>
                <div className="mt-2 flex justify-between gap-3"><span>ID</span><span className="text-right text-ink/70">{credential.serial}</span></div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-9 flex items-center gap-2 text-xs font-bold text-ink/60 sm:mt-12">
          <PiCursorClickBold size={15} />
          Replace each starter card with your real certificate, issuer, issue date, and verification URL.
        </p>
      </div>
    </section>
  );
}
