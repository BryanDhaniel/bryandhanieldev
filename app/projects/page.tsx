import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowLeftBold, PiArrowUpRightBold, PiFolderOpenBold } from "react-icons/pi";

import { ProjectCard } from "@/app/components/projects/project-card";
import { projects } from "@/app/data/projects";

export const metadata: Metadata = {
  title: "Project Archive — Bryan Dhaniel",
  description: "Browse all software, AI, mobile, and research projects by Bryan Dhaniel.",
};

export default function ProjectsPage() {
  const categories = [...new Set(projects.map((project) => project.category))];

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#101010]">
      <nav className="sticky top-0 z-30 border-b border-black/10 bg-[#f4f1eb]/90 px-5 py-3 backdrop-blur-lg sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.13em] text-[#101010]">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#101010] text-[#00ffc6] transition-transform duration-300 group-hover:-rotate-6">BD</span>
            <span className="hidden sm:inline">Back home</span>
          </Link>
          <div className="hidden items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-black/45 md:flex">
            <span className="h-2 w-2 rounded-full bg-[#00ffc6] shadow-[0_0_10px_#00ffc6]" />
            Project archive
          </div>
          <Link href="/#contact" className="rounded-full bg-[#101010] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#f4f1eb] transition-colors hover:bg-[#ff3366]">
            Say hello
          </Link>
        </div>
      </nav>

      <header className="relative overflow-hidden border-b border-black/15 bg-[#d8d5d0] px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-28">
        <div aria-hidden="true" className="absolute -right-28 -top-44 h-[33rem] w-[33rem] rounded-full border-[62px] border-[#00ffc6]/40" />
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-2/3 opacity-35 [background-image:linear-gradient(rgba(16,16,16,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(16,16,16,0.12)_1px,transparent_1px)] [background-size:38px_38px]" />
        <div className="relative mx-auto max-w-[1400px]">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-black/55">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-black/15">01</span>
            All projects
            <span className="h-px w-10 bg-black/15" />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <h1 className="max-w-[9ch] text-[clamp(4rem,11vw,11rem)] font-black leading-[0.76] tracking-[-0.09em]">All projects.</h1>
              <p className="mt-7 max-w-xl text-base font-medium leading-relaxed text-black/65 sm:text-lg">
                A growing archive of product, web, mobile, AI, and research work—each project with its own context, contribution, and outcome.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-black/10 bg-[#f4f1eb]/80 p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-end justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/50">Selected work</p>
                  <p className="mt-1 text-5xl font-black tracking-[-0.08em]">{projects.length}</p>
                </div>
                <PiFolderOpenBold className="text-[#ff3366]" size={31} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-black/10 pt-4">
                {categories.map((category) => (
                  <span key={category} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-black/60">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-7 flex flex-col gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/55">Browse the full collection</p>
            <p className="text-sm font-medium text-black/55">New work can be added from one project data entry.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#101010] px-5 py-10 text-[#f4f1eb] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#00ffc6]">The archive keeps growing</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.065em] sm:text-4xl">Have a project in mind?</h2>
          </div>
          <Link href="/#contact" className="group flex w-fit items-center gap-2 rounded-full bg-[#00ffc6] px-5 py-3 text-sm font-black text-[#101010] transition-transform hover:-translate-y-1">
            Start a conversation
            <PiArrowUpRightBold className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />
          </Link>
        </div>
      </section>

      <Link href="/" className="fixed bottom-5 left-5 z-20 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-[#f4f1eb] text-[#101010] shadow-lg transition-transform hover:-translate-x-0.5 sm:hidden" aria-label="Back to home">
        <PiArrowLeftBold size={16} />
      </Link>
    </main>
  );
}
