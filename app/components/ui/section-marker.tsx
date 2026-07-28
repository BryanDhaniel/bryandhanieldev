type SectionMarkerProps = {
  number: string;
  label: string;
  dark?: boolean;
};

export function SectionMarker({ number, label, dark = false }: SectionMarkerProps) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] sm:text-xs ${
        dark ? "text-white/55" : "text-black/55"
      }`}
    >
      <span className={`grid h-7 w-7 place-items-center rounded-full border ${dark ? "border-white/20" : "border-black/15"}`}>
        {number}
      </span>
      <span>{label}</span>
      <span className={`h-px w-10 ${dark ? "bg-white/20" : "bg-black/15"}`} />
    </div>
  );
}
