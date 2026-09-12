"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before this element starts entering. Use for stagger. */
  delay?: number;
  /** Vertical travel distance, in pixels. */
  distance?: number;
  /** Fraction of the element that must be visible before it enters. */
  amount?: number;
};

/**
 * Scroll-entry wrapper: fades and lifts its children into view once.
 * Only `opacity` and `transform` animate, and the whole thing collapses to a
 * plain fade when the visitor asks for reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  amount = 0.25,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: distance },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
