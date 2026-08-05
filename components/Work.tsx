"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { BrowserFrame, PhoneFrame, SpecPlate } from "./Frames";
import { Reveal, SectionHead } from "./primitives";
import {
  categories,
  liveProjects,
  rankedProjects,
  type Category,
  type Project,
} from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A card that tilts toward the cursor and lifts its shadow with it. */
function TiltCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rx = useSpring(tiltX, { stiffness: 200, damping: 22 });
  const ry = useSpring(tiltY, { stiffness: 200, damping: 22 });

  const glareLeft = useSpring(px, { stiffness: 200, damping: 30 });
  const glare = useMotionTemplate`radial-gradient(46% 40% at ${useTransform(
    glareLeft,
    (v) => `${v * 100}%`
  )} 0%, rgba(255,255,255,0.10), transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    tiltY.set((nx - 0.5) * 9);
    tiltX.set((0.5 - ny) * 9);
  };

  const reset = () => {
    tiltX.set(0);
    tiltY.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  const hasImage = project.images.length > 0;
  const isPhone = project.frame === "phone";

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: EASE }}
      style={{ perspective: 1200 }}
    >
      {/*
        The card body is a full-bleed overlay button rather than a <button> wrapping
        everything, so the "visit live site" anchor can sit above it without nesting
        interactive content inside a button.
      */}
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative block w-full text-left"
      >
        <div className="relative overflow-hidden rounded-[22px] border border-white/8 bg-[#0a0b0e] p-4 transition-colors duration-500 group-hover:border-white/18 sm:p-5">
          <button
            onClick={onOpen}
            data-cursor="View"
            aria-label={`View ${project.name}`}
            className="absolute inset-0 z-10 rounded-[22px]"
          />
          {/* glare that tracks the pointer across the card */}
          {reduced ? null : (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: glare }}
            />
          )}

          <div className="relative" style={{ transform: "translateZ(38px)" }}>
            {hasImage ? (
              isPhone ? (
                <div className="flex aspect-[16/10] items-center justify-center gap-3 overflow-hidden rounded-xl bg-[linear-gradient(150deg,#14161b,#0a0b0e)] px-4">
                  {project.images.slice(0, 3).map((img, i) => (
                    <div
                      key={img}
                      className={`w-[27%] shrink-0 transition-transform duration-700 ${
                        i === 1 ? "-translate-y-3 group-hover:-translate-y-5" : "translate-y-3 group-hover:translate-y-1"
                      }`}
                    >
                      <PhoneFrame src={img} alt={`${project.name} screen ${i + 1}`} sizes="160px" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-hidden rounded-xl">
                  <div className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]">
                    <BrowserFrame
                      src={project.images[0]}
                      alt={project.name}
                      sizes="(max-width: 700px) 92vw, (max-width: 1200px) 46vw, 30vw"
                    />
                  </div>
                </div>
              )
            ) : (
              <SpecPlate
                name={project.name}
                kind={project.kind}
                tech={project.tech}
                accent={project.category === "product" ? "#2fe6c3" : "#f2a312"}
              />
            )}
          </div>

          <div className="relative mt-5 flex items-start justify-between gap-4 px-1 pb-1">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="eyebrow font-mono-x text-[#f2a312]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow truncate text-[#f4f4ef]/40">{project.kind}</span>
                {project.live ? (
                  <span className="eyebrow inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2fe6c3]/40 px-2 py-0.5 text-[#2fe6c3]">
                    <span className="h-1 w-1 rounded-full bg-[#2fe6c3]" />
                    Live
                  </span>
                ) : null}
              </div>
              <h3 className="mt-2.5 truncate text-[19px] font-semibold tracking-[-0.01em] text-[#f4f4ef] sm:text-[21px]">
                {project.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#f4f4ef]/50">
                {project.tagline}
              </p>
            </div>
            {/* z-20 lifts these above the card's full-bleed overlay button */}
            <span className="relative z-20 mt-1 flex shrink-0 items-center gap-2">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Open"
                  aria-label={`Open ${project.name} in a new tab`}
                  className="group/live flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 hover:border-[#2fe6c3] hover:bg-[#2fe6c3]"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-[#f4f4ef] transition-colors duration-300 group-hover/live:text-[#06080a]"
                  >
                    <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </a>
              ) : null}
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-[#f2a312] group-hover:bg-[#f2a312]">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-[#f4f4ef] transition-all duration-300 group-hover:-rotate-45 group-hover:text-[#06080a]"
                >
                  <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Detail({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isPhone = project.frame === "phone";

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="fixed inset-0 bg-[#040507]/85 backdrop-blur-lg"
        onClick={onClose}
        data-cursor="Close"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.985 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative my-auto w-full max-w-[1080px] overflow-hidden rounded-3xl border border-white/12 bg-[#0a0b0e] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          data-cursor="Close"
          className="absolute top-5 right-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a0b0e]/80 backdrop-blur transition-colors hover:border-white/40"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="#f4f4ef" strokeWidth="1.4" />
          </svg>
        </button>

        <div className="border-b border-white/8 px-6 pt-8 pb-7 sm:px-10 sm:pt-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow rounded-full border border-[#f2a312]/45 px-2.5 py-1 text-[#f2a312]">
              {project.kind}
            </span>
            <span className="eyebrow font-mono-x text-[#f4f4ef]/40">{project.year}</span>
          </div>
          <h3 className="mt-5 text-[clamp(30px,5vw,54px)] leading-[1.02] font-medium tracking-[-0.025em] text-[#f4f4ef]">
            {project.name}
          </h3>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-[#f4f4ef]/60">
            {project.tagline}
          </p>
        </div>

        {project.images.length > 0 ? (
          <div
            className={
              isPhone
                ? "no-bar flex gap-4 overflow-x-auto bg-[linear-gradient(160deg,#14161b,#0a0b0e)] px-6 py-8 sm:px-10"
                : "space-y-4 bg-[#08090c] px-6 py-8 sm:px-10"
            }
          >
            {project.images.map((img, i) =>
              isPhone ? (
                <div key={img} className="w-[168px] shrink-0 sm:w-[196px]">
                  <PhoneFrame src={img} alt={`${project.name} screen ${i + 1}`} sizes="200px" />
                </div>
              ) : (
                <BrowserFrame
                  key={img}
                  src={img}
                  alt={`${project.name} view ${i + 1}`}
                  sizes="(max-width: 1100px) 92vw, 1000px"
                />
              )
            )}
          </div>
        ) : null}

        <div className="grid gap-10 px-6 py-9 sm:px-10 sm:py-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow text-[#f4f4ef]/40">Overview</p>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#f4f4ef]/70">{project.detail}</p>

            {project.metrics?.length ? (
              <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="border-l border-[#2fe6c3]/40 pl-4">
                    <p className="text-lg font-semibold text-[#f4f4ef]">{m.value}</p>
                    <p className="eyebrow mt-1.5 text-[#f4f4ef]/45">{m.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow text-[#f4f4ef]/40">Role</p>
              <p className="mt-3 text-sm text-[#f4f4ef]/75">{project.role}</p>
            </div>
            <div>
              <p className="eyebrow text-[#f4f4ef]/40">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono-x rounded border border-white/12 px-2.5 py-1.5 text-[11px] text-[#f4f4ef]/65"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Open"
                className="group inline-flex items-center gap-3 rounded-full bg-[#f2a312] px-6 py-3.5 text-[11px] font-semibold tracking-[0.14em] text-[#06080a] uppercase transition-transform duration-300 hover:scale-[1.03]"
              >
                Visit live site
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 15 15 5M7 5h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </svg>
              </a>
            ) : project.confidential ? (
              <p className="text-[12px] leading-relaxed text-[#f4f4ef]/40">
                Client system — screens aren&apos;t public. Happy to walk through the architecture
                on a call.
              </p>
            ) : null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const shown = useMemo(
    () => (filter === "all" ? rankedProjects : rankedProjects.filter((p) => p.category === filter)),
    [filter]
  );

  const open = rankedProjects.find((p) => p.key === openKey) ?? null;
  const close = useCallback(() => setOpenKey(null), []);

  // The command palette scrolls here, then asks us to open a specific card.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const key = (e as CustomEvent<string>).detail;
      if (rankedProjects.some((p) => p.key === key)) {
        setFilter("all");
        setOpenKey(key);
      }
    };
    window.addEventListener("open-project", onOpen);
    return () => window.removeEventListener("open-project", onOpen);
  }, []);

  return (
    <section id="work" className="relative w-full scroll-mt-24 overflow-hidden bg-[#07080b]">
      <div className="pointer-events-none absolute top-0 right-[-15%] h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,#8d1d5f55,transparent_72%)] blur-3xl" />

      <div className="relative z-10 px-[var(--gutter)] py-28 sm:py-36">
        <SectionHead
          index="02"
          kicker={`Selected work · ${rankedProjects.length} builds · ${liveProjects.length} live`}
          title={
            <>
              The whole
              <br />
              <span className="font-accent text-[#f2a312]">shelf</span>
            </>
          }
          note={
            <>
              Shipped products, ERP systems, storefronts and UI kits. Tap any card for the stack,
              the role I played, and where it lives.
            </>
          }
        />

        {/* filters */}
        <Reveal className="mt-14">
          <div className="no-bar -mx-[var(--gutter)] flex gap-2.5 overflow-x-auto px-[var(--gutter)] pb-2">
            {categories.map((c) => {
              const count =
                c.key === "all" ? rankedProjects.length : rankedProjects.filter((p) => p.category === c.key).length;
              const isActive = filter === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => setFilter(c.key)}
                  data-cursor="Filter"
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[11px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 ${
                    isActive
                      ? "border-transparent text-[#06080a]"
                      : "border-white/14 text-[#f4f4ef]/55 hover:border-white/35 hover:text-[#f4f4ef]"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-[#f2a312]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">
                    {c.label}
                    <span className={isActive ? "ml-2 opacity-60" : "ml-2 opacity-45"}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* grid */}
        <motion.div layout className="mt-12 grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.div key={p.key} layout exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                <TiltCard project={p} index={i} onOpen={() => setOpenKey(p.key)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{open ? <Detail project={open} onClose={close} /> : null}</AnimatePresence>
    </section>
  );
}
