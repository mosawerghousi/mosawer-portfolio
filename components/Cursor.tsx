"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * A two-part cursor: a small solid dot that tracks the pointer exactly, and a
 * larger ring that lags behind it. Elements opt into the expanded, labelled state
 * by setting `data-cursor="View"` — the ring then grows and shows that word.
 */
export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduced;

  const [label, setLabel] = useState<string | null>(null);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 260, damping: 26, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);

      const hit = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(hit?.dataset.cursor ?? null);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, mx, my, visible]);

  if (!enabled) return null;

  const expanded = label !== null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-[#f2a312]"
        style={{ x: mx, y: my }}
        animate={{ opacity: visible && !expanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full"
        style={{ x: rx, y: ry }}
        animate={{
          width: expanded ? 88 : 34,
          height: expanded ? 88 : 34,
          marginLeft: expanded ? -44 : -17,
          marginTop: expanded ? -44 : -17,
          opacity: visible ? 1 : 0,
          scale: down ? 0.88 : 1,
          backgroundColor: expanded ? "rgba(242,163,18,0.95)" : "rgba(242,163,18,0)",
          borderColor: expanded ? "rgba(242,163,18,0)" : "rgba(244,244,239,0.5)",
        }}
        transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.6 }}
      >
        <div className="h-full w-full rounded-full border border-[inherit]" style={{ borderColor: "inherit" }} />
        <AnimatePresence>
          {expanded ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="eyebrow absolute text-[#06080a]"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
