"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import GradientBg from "./GradientBg";

const LENS = 250;

const lineReveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, delay: 0.25 + i * 0.14, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Headline({ isCopy = false }: { isCopy?: boolean }) {
  const Wrapper = isCopy ? "div" : motion.div;
  const common = "block leading-[0.93] tracking-[-0.02em]";
  return (
    <h1
      aria-hidden={isCopy || undefined}
      className="relative select-none text-[clamp(60px,12.5vw,190px)] font-medium text-[#f4f4ef]"
    >
      <span className="block overflow-hidden">
        <Wrapper
          {...(!isCopy && { variants: lineReveal, custom: 0, initial: "hidden", animate: "show" })}
          className={common}
        >
          Creative
        </Wrapper>
      </span>
      <span className="block overflow-hidden">
        <Wrapper
          {...(!isCopy && { variants: lineReveal, custom: 1, initial: "hidden", animate: "show" })}
          className={`${common} ml-[30vw] sm:ml-[36vw]`}
        >
          developer
        </Wrapper>
      </span>
      {isCopy ? (
        <span className="font-accent absolute right-[1vw] top-[34%] text-[clamp(30px,4.6vw,74px)] lowercase text-[#f2a312]">
          full-stack
        </span>
      ) : (
        <motion.span
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.9 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
          className="font-accent absolute right-[1vw] top-[34%] text-[clamp(30px,4.6vw,74px)] lowercase text-[#f2a312]"
        >
          full-stack
        </motion.span>
      )}
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
      className="flex gap-14 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.14em] sm:gap-24 sm:text-[11px]"
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
    </Tag>
  );
}

function HeroInner({ isCopy = false }: { isCopy?: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between px-[7vw] pb-12 pt-32 sm:pb-16">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <Headline isCopy={isCopy} />
        </div>
      </div>
      <Meta isCopy={isCopy} />
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [lensOn, setLensOn] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 110, damping: 16, mass: 0.5 });
  const y = useSpring(my, { stiffness: 110, damping: 16, mass: 0.5 });

  const lensLeft = useTransform(x, (v) => v - LENS / 2);
  const lensTop = useTransform(y, (v) => v - LENS / 2);
  const worldX = useTransform(x, (v) => LENS / 2 - v);
  const worldY = useTransform(y, (v) => LENS / 2 - v);
  const origin = useMotionTemplate`${x}px ${y}px`;

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
      onMouseMove={onMove}
      onMouseLeave={() => setLensOn(false)}
      className="relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      {/* SVG filter: RGB channel split for chromatic aberration */}
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

      <div className="relative z-10 h-full">
        <HeroInner />
      </div>

      {/* Glass lens following the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden [@media(pointer:fine)]:block"
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
          {/* magnified, chromatically-split copy of the hero content */}
          <motion.div
            className="absolute left-0 top-0 h-svh min-h-[640px] w-screen"
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
        {/* glass rim + highlight */}
        <div className="absolute inset-0 rounded-full border border-white/15 shadow-[inset_0_0_35px_rgba(0,0,0,0.35),0_18px_50px_rgba(0,0,0,0.35)]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.14),transparent_45%)]" />
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-12 right-[7vw] z-10 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="h-20 w-px bg-[#f4f4ef]/50" />
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" className="-mt-px">
            <path d="M0.5 0.5L4.5 5L8.5 0.5" stroke="#f4f4ef" strokeOpacity="0.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
