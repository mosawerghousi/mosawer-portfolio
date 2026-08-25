"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { PhoneFrame } from "./Frames";
import { Reveal, SectionHead } from "./primitives";
import { phoneGallery, rankedProjects } from "@/lib/data";

/** Every Flutter screen, flattened into one rail with its kit's name attached. */
const screens = phoneGallery.flatMap((kit) =>
  kit.images.map((src, i) => ({ src, kit: kit.name, href: kit.href, i }))
);

// Apps and kits both live under "mobile" now, so this counts the whole shelf.
const mobileCount = rankedProjects.filter((p) => p.category === "mobile").length;

export default function MobileRail() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [dragging, setDragging] = useState(false);

  // The rail drifts as the section passes, so it feels alive before you touch it.
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], ["4%", "-10%"]);

  // Click-and-drag horizontal scrolling, because a bare scrollbar isn't an invitation.
  const start = useRef({ x: 0, left: 0 });
  const onDown = (e: React.MouseEvent) => {
    if (!rail.current) return;
    setDragging(true);
    start.current = { x: e.pageX, left: rail.current.scrollLeft };
  };
  const onMove = (e: React.MouseEvent) => {
    if (!dragging || !rail.current) return;
    e.preventDefault();
    rail.current.scrollLeft = start.current.left - (e.pageX - start.current.x);
  };
  const stop = () => setDragging(false);

  return (
    <section
      ref={section}
      id="mobile"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#06080a]"
    >
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,#0e353588,transparent_70%)] blur-3xl" />

      <div className="relative z-10 py-28 sm:py-36">
        <div className="px-[var(--gutter)]">
          <SectionHead
            index="03"
            kicker={`Flutter · ${mobileCount} apps & kits · ${screens.length} screens`}
            title={
              <>
                Built for the
                <br />
                <span className="font-accent text-[#2fe6c3]">thumb</span>
              </>
            }
            note={
              <>
                Riverpod, go_router and clean architecture — one codebase per build, running on
                Android, iOS and desktop. Drag the rail.
              </>
            }
          />
        </div>

        {/* rail */}
        <motion.div style={reduced ? undefined : { x: drift }} className="mt-16">
          <div
            ref={rail}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={stop}
            onMouseLeave={stop}
            data-cursor="Drag"
            className={`no-bar flex gap-5 overflow-x-auto px-[var(--gutter)] pb-6 select-none ${
              dragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {screens.map((s, i) => (
              <motion.div
                key={`${s.kit}-${s.src}`}
                initial={reduced ? undefined : { opacity: 0, y: 30 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: Math.min(i, 8) * 0.04 }}
                className="group w-[150px] shrink-0 sm:w-[186px]"
              >
                <div className="transition-transform duration-500 group-hover:-translate-y-2">
                  <PhoneFrame
                    src={s.src}
                    alt={`${s.kit} — screen ${s.i + 1}`}
                    sizes="(max-width: 640px) 150px, 186px"
                  />
                </div>
                <p className="eyebrow mt-4 text-[#f4f4ef]/35 transition-colors duration-300 group-hover:text-[#2fe6c3]">
                  {s.kit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* kit index under the rail */}
        <Reveal className="mt-12 px-[var(--gutter)]">
          <div className="rule-fade mb-8" />
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {rankedProjects
              .filter((p) => p.category === "mobile")
              .map((kit) => (
                <a
                  key={kit.key}
                  href={kit.href ?? "#work"}
                  target={kit.href ? "_blank" : undefined}
                  rel={kit.href ? "noopener noreferrer" : undefined}
                  data-cursor={kit.href ? "Open" : "View"}
                  className="group flex items-baseline gap-2 text-sm text-[#f4f4ef]/45 transition-colors hover:text-[#f4f4ef]"
                >
                  <span className="font-mono-x text-[10px] text-[#2fe6c3]/60">↗</span>
                  {kit.name}
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
