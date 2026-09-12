type SectionMarkerProps = {
  number: string;
  label: string;
  dark?: boolean;
  accent?: string;
  className?: string;
  rule?: boolean;
};

/**
 * A compact section kicker: numbered chip + label + optional hairline rule.
 * Used as a consistent signpost across sections — never as a full split-header.
 */
export function SectionMarker({
  number,
  label,
  dark = false,
  accent = "#00ffc6",
  className = "",
  rule = true,
}: SectionMarkerProps) {
  return (
    <div
      className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] ${
        dark ? "text-white/55" : "text-ink/65"
      } ${className}`}
    >
      <span
        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px]"
        style={{ backgroundColor: accent, color: "#101010" }}
      >
        {number}
      </span>
      <span className="font-bold">{label}</span>
      {rule && (
        <span
          className={`h-px min-w-8 flex-1 ${dark ? "bg-white/15" : "bg-ink/15"}`}
        />
      )}
    </div>
  );
}
