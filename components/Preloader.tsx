"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/data";
import { useIsClient, useMediaQuery } from "@/lib/hooks";

const EASE = [0.76, 0, 0.24, 1] as const;
const DURATION = 1900;

/**
 * Counts to 100, then lifts away as two panels. It runs once per tab — a
 * sessionStorage flag keeps it from replaying on every internal navigation,
 * because a loader you have to sit through twice stops being a flourish.
 */
export default function Preloader() {
  const isClient = useIsClient();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [pct, setPct] = useState(0);
  const [finished, setFinished] = useState(false);

  // Read once and hold the answer — the flag is written before the exit animation
  // ends, and re-reading it would tear the run down mid-flight.
  const [seen] = useState(() =>
    typeof window === "undefined" ? true : sessionStorage.getItem("intro-seen") !== null
  );

  const running = isClient && !reduced && !seen && !finished;

  useEffect(() => {
    if (!running) return;

    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("intro-seen", "1");
        setFinished(true);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [running]);

  return (
    <AnimatePresence>
      {running ? (
        <motion.div key="intro" className="fixed inset-0 z-[100]" aria-hidden>
          {/* two panels that peel toward their own outer edge on exit */}
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="absolute left-0 h-1/2 w-full bg-[#06080a]"
              style={{ top: i === 0 ? 0 : "50%", transformOrigin: i === 0 ? "top" : "bottom" }}
              initial={{ scaleY: 1 }}
              exit={{ scaleY: 0, transition: { duration: 0.9, ease: EASE, delay: i * 0.06 } }}
            />
          ))}

          <motion.div
            className="relative flex h-full w-full flex-col items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="eyebrow text-[#f4f4ef]/55"
              >
                {profile.shortName}
              </motion.p>
            </div>

            <p className="font-mono-x mt-4 text-[clamp(56px,13vw,150px)] leading-none font-medium tracking-[-0.03em] text-[#f4f4ef] tabular-nums">
              {String(pct).padStart(3, "0")}
            </p>

            <div className="mt-8 h-px w-[46vw] max-w-[420px] overflow-hidden bg-white/12">
              <div className="h-full bg-[#f2a312]" style={{ width: `${pct}%` }} />
            </div>

            <p className="eyebrow mt-6 text-[#f4f4ef]/35">Full-stack · DevOps · Kabul</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
