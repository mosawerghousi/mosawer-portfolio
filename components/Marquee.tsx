"use client";

import { motion, useReducedMotion } from "motion/react";
import { marquee } from "@/lib/data";

/**
 * Two identical tracks side by side, the pair translated by exactly -50%. The
 * seam lands where the second copy starts, so the loop reads as continuous.
 */
export default function Marquee() {
  const reduced = useReducedMotion();
  const items = [...marquee, ...marquee];

  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-[#08090c] py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {items.map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-[13px] font-semibold tracking-[0.2em] text-[#f4f4ef]/45 uppercase">
              {word}
            </span>
            <span className="text-[#f2a312]">✦</span>
          </span>
        ))}
      </motion.div>
      {/* feather the ends so words dissolve rather than clip */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#08090c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#08090c] to-transparent" />
    </div>
  );
}
