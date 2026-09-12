"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type CaseStudySection = {
  id: string;
  label: string;
};

type CaseStudyNavProps = {
  items: CaseStudySection[];
  /** Accent of the current project, used for the active indicator. */
  accent: string;
  className?: string;
};

/**
 * Anchor navigation for the case-study body that highlights the section the
 * reader is currently in. Uses IntersectionObserver rather than a scroll
 * listener so nothing runs on the scroll frame.
 */
export function CaseStudyNav({ items, accent, className = "" }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -66% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Case study sections" className={className}>
      <ol className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0 lg:pb-0">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-bold tracking-[-0.01em] transition-colors duration-300 lg:rounded-lg lg:px-3 lg:py-2.5 ${
                  isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    aria-hidden="true"
                    layoutId="case-study-nav-pill"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 34, mass: 0.6 }
                    }
                    className="absolute inset-0 rounded-full bg-ink/[0.06] ring-1 ring-ink/10 lg:rounded-lg"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative h-4 w-[3px] shrink-0 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: isActive ? accent : "rgba(16,16,16,0.14)" }}
                />
                <span className="relative">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
