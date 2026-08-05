"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, profile } from "@/lib/data";
import { useIsClient } from "@/lib/hooks";
import { scrollToSection } from "./SmoothScroll";

const SECTION_IDS = ["studio", "work", "mobile", "contact"];

function KabulClock() {
  const isClient = useIsClient();
  // The interval only nudges a counter; the time itself is derived during render,
  // so the clock never renders on the server and never mismatches on hydration.
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 15_000);
    return () => clearInterval(id);
  }, []);

  const time = isClient
    ? new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: profile.timezone,
      }).format(new Date())
    : "--:--";

  return <span className="font-mono-x tabular-nums">{time}</span>;
}

export default function Nav() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    // Hide on the way down, bring it back the moment they scroll up.
    setHidden(y > prev && y > 260 && !open);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    const onTop = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive("");
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    const wasOpen = open;
    setOpen(false);
    // Let the sheet finish closing before the scroll starts, or the two fight.
    setTimeout(() => scrollToSection(href), wasOpen ? 380 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: hidden ? -100 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[70] mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-[var(--gutter)] py-6 text-white">
          <button
            onClick={() => {
              setOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-cursor="Top"
            className="text-[12px] font-bold tracking-[0.12em] whitespace-nowrap"
          >
            {profile.shortName}
          </button>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                data-cursor="Go"
                className="group relative text-[11px] font-semibold tracking-[0.14em] uppercase"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-white transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="eyebrow hidden items-center gap-2 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              KABUL <KabulClock />
            </span>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              data-cursor={open ? "Close" : "Menu"}
              className="flex h-6 w-7 flex-col items-end justify-center gap-[5px] md:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 3.5, width: 28 } : { rotate: 0, y: 0, width: 28 }}
                className="block h-px bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -3.5, width: 28 } : { rotate: 0, y: 0, width: 18 }}
                className="block h-px bg-white"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[65] bg-[#06080a] md:hidden"
          >
            <div className="flex h-full flex-col justify-center px-[var(--gutter)]">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.5 }}
                  onClick={() => go(link.href)}
                  className="border-b border-white/10 py-6 text-left text-[clamp(34px,10vw,60px)] font-medium tracking-[-0.02em] text-[#f4f4ef]"
                >
                  <span className="eyebrow mr-4 align-middle font-mono-x text-[#f2a312]">0{i + 1}</span>
                  {link.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                href={`mailto:${profile.email}`}
                className="mt-12 text-sm text-[#f4f4ef]/55"
              >
                {profile.email}
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
