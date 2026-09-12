"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

type ScrollProgressProps = {
  /** Bar colour, usually the accent of the project being read. */
  accent: string;
};

/**
 * A hairline reading-progress bar pinned to the top of the viewport.
 * Scroll position is a motion value, so this never re-renders the page.
 */
export function ScrollProgress({ accent }: ScrollProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.35,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px] origin-left"
      style={{
        scaleX: shouldReduceMotion ? scrollYProgress : smoothed,
        backgroundColor: accent,
      }}
    />
  );
}
