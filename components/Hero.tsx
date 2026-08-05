"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import GradientBg from "./GradientBg";
import { profile } from "@/lib/data";

const LENS = 250;
const EASE = [0.22, 1, 0.36, 1] as const;

const lineReveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.25 + i * 0.14, ease: EASE },
  }),
};

/**
 * The headline is rendered twice: once for real, and once (isCopy) inside the
 * lens, where it gets magnified and chromatically split. Keeping them in one
 * component is what guarantees the magnified copy can never drift out of sync.
 */
function Headline({ isCopy = false }: { isCopy?: boolean }) {
  const Wrapper = isCopy ? "div" : motion.div;
  const common = "leading-[0.93] tracking-[-0.02em]";
  // The accent word rides the first line as a flex sibling rather than an absolute
  // overlay — that way it can never collide with the headline at any viewport width.
  const accent = (
    <span className="font-accent shrink-0 text-[clamp(22px,4.2vw,64px)] lowercase text-[#f2a312]">
      full-stack
    </span>
  );

  return (
    <h1
      aria-hidden={isCopy || undefined}
      className="relative text-[clamp(50px,12vw,170px)] font-medium text-[#f4f4ef] select-none"
    >
      <span className="block overflow-hidden">
        <Wrapper
          {...(!isCopy && { variants: lineReveal, custom: 0, initial: "hidden", animate: "show" })}
          className={`${common} flex items-baseline justify-between gap-4`}
        >
          <span>Creative</span>
          {isCopy ? (
            accent
          ) : (
            <motion.span
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
              className="shrink-0"
            >
              {accent}
            </motion.span>
          )}
        </Wrapper>
      </span>
      <span className="block overflow-hidden">
        <Wrapper
          {...(!isCopy && { variants: lineReveal, custom: 1, initial: "hidden", animate: "show" })}
          className={`${common} block ml-[16vw] sm:ml-[22vw]`}
        >
          developer
        </Wrapper>
      </span>
    </h1>
  );
}

function Meta({ isCopy = false }: { isCopy?: boolean }) {
  const Tag = isCopy ? "div" : motion.div;
  return (
    <Tag
      aria-hidden={isCopy || undefined}
      {...(!isCopy && {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, delay: 1.2, ease: "easeOut" },
      })}
      className="flex flex-wrap items-start gap-x-14 gap-y-8 text-[10px] leading-relaxed font-semibold tracking-[0.14em] uppercase sm:gap-x-20 sm:text-[11px]"
    >
      <div>
        <p className="text-[#f4f4ef]">
          Web &amp; Mobile / Full-stack
          <br />/ DevOps
        </p>
        <p className="mt-4 text-[#f4f4ef]/55">
          Currently available
          <br />
          for remote work
          <br />
          worldwide
        </p>
      </div>
      <div>
        <p className="text-[#f4f4ef]">
          Based
          <br />
          in Kabul
        </p>
        <p className="mt-4 text-[#f4f4ef]/55">Building Zoroo</p>
      </div>
      <div className="hidden lg:block">
        <p className="text-[#f4f4ef]">
          Six years
          <br />
          shipping
        </p>
        <p className="mt-4 text-[#f4f4ef]/55">
          ERP · SaaS
          <br />
          Storefronts · Apps
        </p>
      </div>

      {/* Availability pill lives in the flow, so it can't land on top of the columns. */}
      <AvailabilityPill isCopy={isCopy} />
    </Tag>
  );
}

function AvailabilityPill({ isCopy }: { isCopy: boolean }) {
  const inner = (
    <>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2fe6c3] opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2fe6c3]" />
      </span>
      <span className="text-[#f4f4ef]/85">Available for work</span>
    </>
  );
  const classes =
    "hidden items-center gap-2.5 self-end rounded-full border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur-md sm:ml-auto sm:inline-flex";

  // The magnified lens copy must not duplicate a focusable link.
  return isCopy ? (
    <div className={classes}>{inner}</div>
  ) : (
    <a
      href={`mailto:${profile.email}`}
      data-cursor="Email"
      className={`${classes} transition-colors hover:border-[#2fe6c3]/60`}
    >
      {inner}
    </a>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="hidden justify-end sm:flex"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <div className="h-16 w-px bg-[#f4f4ef]/45" />
        <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="-mt-px">
          <path d="M0.5 0.5L4.5 5L8.5 0.5" stroke="#f4f4ef" strokeOpacity="0.5" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function HeroInner({ isCopy = false }: { isCopy?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between px-[var(--gutter)] pt-32 pb-12 sm:pb-16">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <Headline isCopy={isCopy} />
        </div>
      </div>
      <div>
        {/* Kept in the flow so it can't land on the meta row or the pill. */}
        <div className="mb-10">
          <ScrollCue />
        </div>
        <Meta isCopy={isCopy} />
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [lensOn, setLensOn] = useState(false);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 110, damping: 16, mass: 0.5 });
  const y = useSpring(my, { stiffness: 110, damping: 16, mass: 0.5 });

  const lensLeft = useTransform(x, (v) => v - LENS / 2);
  const lensTop = useTransform(y, (v) => v - LENS / 2);
  const worldX = useTransform(x, (v) => LENS / 2 - v);
  const worldY = useTransform(y, (v) => LENS / 2 - v);
  const origin = useMotionTemplate`${x}px ${y}px`;

  // The whole hero drifts up and dims slightly as the next section takes over.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    if (!lensOn) setLensOn(true);
  };

  return (
    <section
      ref={ref}
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={() => setLensOn(false)}
      className="relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      {/* RGB channel split, used only inside the lens */}
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <filter id="chromab" colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="r"
            />
            <feOffset in="r" dx="7" dy="2" result="r2" />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="g"
            />
            <feOffset in="g" dx="0" dy="-2" result="g2" />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
              result="b"
            />
            <feOffset in="b" dx="-7" dy="2" result="b2" />
            <feBlend in="r2" in2="g2" mode="screen" result="rg" />
            <feBlend in="rg" in2="b2" mode="screen" />
          </filter>
        </defs>
      </svg>

      <GradientBg variant="hero" />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-45" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 h-full">
        <HeroInner />
      </motion.div>

      {/* Glass lens following the cursor */}
      {reduced ? null : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-20 hidden [@media(pointer:fine)]:block"
          style={{ x: lensLeft, y: lensTop, width: LENS, height: LENS }}
          animate={{ opacity: lensOn ? 1 : 0, scale: lensOn ? 1 : 0.6 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={
              lensOn
                ? {
                    backdropFilter: "blur(9px) saturate(130%)",
                    WebkitBackdropFilter: "blur(9px) saturate(130%)",
                  }
                : undefined
            }
          >
            <motion.div
              className="absolute top-0 left-0 h-svh min-h-[640px] w-screen"
              style={{ x: worldX, y: worldY }}
            >
              <motion.div
                className="h-full w-full"
                style={{
                  transformOrigin: origin,
                  scale: 1.16,
                  filter: "url(#chromab) blur(2.5px)",
                }}
              >
                <HeroInner isCopy />
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute inset-0 rounded-full border border-white/15 shadow-[inset_0_0_35px_rgba(0,0,0,0.35),0_18px_50px_rgba(0,0,0,0.35)]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.14),transparent_45%)]" />
        </motion.div>
      )}

    </section>
  );
}
