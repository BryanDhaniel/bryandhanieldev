import Link from "next/link";
import { PiArrowLeftBold } from "react-icons/pi";

export default function ProjectNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#101010] px-5 text-[#f4f1eb]">
      <div className="max-w-lg text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00ffc6]">404 · Project archive</p>
        <h1 className="mt-5 text-5xl font-black leading-[0.83] tracking-[-0.08em] sm:text-7xl">This project is out of orbit.</h1>
        <p className="mt-6 text-base font-medium leading-relaxed text-white/60">The project you are looking for does not exist in this archive yet.</p>
        <Link href="/projects" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f4f1eb] px-5 py-3 text-sm font-black text-[#101010] transition-transform hover:-translate-y-1">
          <PiArrowLeftBold size={16} />
          Back to all projects
        </Link>
      </div>
    </main>
  );
}
