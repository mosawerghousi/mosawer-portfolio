"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise on entry. The workhorse reveal for blocks of content. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  amount = 0.35,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line-by-line rise, for headlines that should feel typeset rather than faded in.
 *
 * The viewport trigger has to live on the *outer* element. An IntersectionObserver
 * clips against overflow-hidden ancestors, so a line parked at y:110% behind its own
 * mask reports a ratio of 0 and would wait for a threshold it can never reach.
 */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.span
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "show"}
      viewport={{ once: true, amount: 0.35 }}
    >
      {/* the padding extends each clip box so italic descenders survive the mask */}
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: { duration: 0.95, delay: delay + i * 0.09, ease: EASE },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" } },
};

/** Word-by-word blur-in. `*` at the end of a word marks it for the serif accent treatment. */
export function WordReveal({
  text,
  className,
  accentClassName = "font-accent text-[#2fe6c3]",
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  accentClassName?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  if (reduced) return <p className={className}>{text.replace(/\*/g, "")}</p>;
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger }}
    >
      {words.map((word, i) => {
        const accent = word.endsWith("*");
        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`mr-[0.28em] inline-block ${accent ? accentClassName : ""}`}
          >
            {accent ? word.slice(0, -1) : word}
          </motion.span>
        );
      })}
    </motion.p>
  );
}

/** Counts up once the element scrolls into view. */
export function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo — fast arrival, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Math.round(to * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  // With motion reduced there's nothing to animate — render the final figure outright.
  return (
    <span ref={ref}>
      {reduced ? to : n}
      {suffix}
    </span>
  );
}

/** Pulls its child toward the cursor while hovered. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Section header — index, kicker and rule, shared by every section below the hero. */
export function SectionHead({
  index,
  kicker,
  title,
  note,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="eyebrow font-mono-x text-[#f2a312]">{index}</span>
          <span className="h-px w-10 bg-[#f2a312]/50" />
          <span className="eyebrow text-[#f4f4ef]/55">{kicker}</span>
        </div>
      </Reveal>
      <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <h2 className="max-w-[16ch] text-[clamp(38px,6vw,86px)] font-medium leading-[0.98] tracking-[-0.025em]">
          {title}
        </h2>
        {note ? (
          <Reveal delay={0.15}>
            <div className="max-w-[38ch] text-sm leading-relaxed text-[#f4f4ef]/55">{note}</div>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
