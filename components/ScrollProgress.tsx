"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress rail pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[75] h-[2px] origin-left bg-gradient-to-r from-[#f2a312] via-[#f2a312] to-[#2fe6c3]"
    />
  );
}
