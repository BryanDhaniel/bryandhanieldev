export default function ProjectLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-paper px-5 py-6 text-ink sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-between gap-4">
          <div className="h-9 w-36 rounded-xl bg-ink/10" />
          <div className="h-9 w-32 rounded-full bg-ink/10" />
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <div className="h-7 w-24 rounded-full bg-ink/10" />
          <div className="h-7 w-16 rounded-full bg-ink/10" />
        </div>
        <div className="mt-7 h-16 max-w-3xl rounded-2xl bg-ink/10 sm:h-20" />
        <div className="mt-8 h-6 max-w-xl rounded-full bg-ink/10" />
        <div className="mt-3 h-6 max-w-md rounded-full bg-ink/10" />
        <div className="mt-12 rounded-[2rem] bg-ink/[0.05] p-1.5 ring-1 ring-ink/10 sm:p-2">
          <div className="aspect-[16/10] rounded-[calc(2rem-0.5rem)] bg-ink/10" />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <div className="hidden lg:block">
            <div className="h-40 rounded-2xl bg-ink/[0.06]" />
          </div>
          <div className="space-y-5">
            <div className="h-7 w-32 rounded-full bg-ink/10" />
            <div className="h-10 max-w-2xl rounded-2xl bg-ink/10" />
            <div className="h-10 max-w-xl rounded-2xl bg-ink/10" />
            <div className="h-28 rounded-2xl bg-ink/10" />
          </div>
        </div>
      </div>
    </main>
  );
}
