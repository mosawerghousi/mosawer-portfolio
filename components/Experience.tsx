"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Reveal, SectionHead } from "./primitives";
import { certifications, education, experience, skills } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

function Entry({ item, index }: { item: (typeof experience)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="border-t border-white/10 last:border-b">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor={open ? "Less" : "More"}
        className="group flex w-full items-start justify-between gap-6 py-8 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow font-mono-x text-[#f2a312]">{item.timeframe}</span>
          </div>
          <h3 className="mt-3 text-[clamp(22px,3vw,34px)] leading-tight font-medium tracking-[-0.02em] text-[#f4f4ef] transition-colors duration-300 group-hover:text-[#f2a312]">
            {item.company}
          </h3>
          <p className="mt-2 text-sm text-[#f4f4ef]/55">{item.role}</p>
        </div>
        <span className="relative mt-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors duration-300 group-hover:border-[#f2a312]">
          <span className="absolute h-px w-3 bg-[#f4f4ef]/70" />
          <motion.span
            animate={{ rotate: open ? 0 : 90 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute h-px w-3 bg-[#f4f4ef]/70"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-10 lg:pl-[6vw]">
              <p className="max-w-[70ch] text-[15px] leading-relaxed text-[#f4f4ef]/70">
                {item.summary}
              </p>

              {item.achievements.length > 0 ? (
                <ul className="mt-7 space-y-4">
                  {item.achievements.map((a, i) => (
                    <li key={i} className="flex max-w-[76ch] gap-4">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#2fe6c3]" />
                      <span className="text-[14px] leading-relaxed text-[#f4f4ef]/58">{a}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {item.clients?.map((client) => (
                <div key={client.name} className="mt-9 border-l border-[#f2a312]/35 pl-6">
                  <p className="text-sm font-semibold tracking-wide text-[#f4f4ef]">
                    {client.href ? (
                      <a
                        href={client.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Open"
                        className="transition-colors hover:text-[#f2a312]"
                      >
                        {client.name} ↗
                      </a>
                    ) : (
                      client.name
                    )}
                  </p>
                  <ul className="mt-4 space-y-3">
                    {client.bullets.map((b, i) => (
                      <li key={i} className="flex max-w-[74ch] gap-4">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                        <span className="text-[14px] leading-relaxed text-[#f4f4ef]/55">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <section className="relative w-full overflow-hidden bg-[#07080b]">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-10 px-[var(--gutter)] py-28 sm:py-36">
        <SectionHead
          index="04"
          kicker="Track record"
          title={
            <>
              Six years of
              <br />
              <span className="font-accent text-[#f2a312]">shipping</span>
            </>
          }
          note={
            <>
              Employment and freelance, mostly at the same time. Every line below is something
              running in production for someone who depends on it.
            </>
          }
        />

        <div ref={ref} className="relative mt-16">
          {/* progress spine — fills as you read down the list */}
          <div className="absolute top-0 -left-6 hidden h-full w-px bg-white/8 lg:block">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-[#f2a312] to-[#2fe6c3]"
              style={{ scaleY: line }}
            />
          </div>

          {experience.map((item, i) => (
            <Entry key={item.company} item={item} index={i} />
          ))}
        </div>

        {/* stack */}
        <div className="mt-24">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="eyebrow font-mono-x text-[#2fe6c3]">05</span>
              <span className="h-px w-10 bg-[#2fe6c3]/50" />
              <span className="eyebrow text-[#f4f4ef]/55">The toolkit</span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((group, gi) => (
              <Reveal key={group.group} delay={gi * 0.06}>
                <div>
                  <p className="eyebrow text-[#f4f4ef]/40">{group.group}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[12px] text-[#f4f4ef]/70 transition-colors duration-300 hover:border-[#2fe6c3]/50 hover:text-[#f4f4ef]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="rule-fade my-14" />

          <div className="grid gap-12 sm:grid-cols-2">
            <Reveal>
              <div>
                <p className="eyebrow text-[#f4f4ef]/40">Education</p>
                {education.map((e) => (
                  <div key={e.institution} className="mt-4">
                    <p className="text-[17px] font-medium text-[#f4f4ef]">{e.credential}</p>
                    <p className="mt-1.5 text-sm text-[#f4f4ef]/50">
                      {e.institution} — {e.detail.replace(`${e.institution} — `, "")}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <p className="eyebrow text-[#f4f4ef]/40">Certifications</p>
                <ul className="mt-4 space-y-2.5">
                  {certifications.map((c) => (
                    <li key={c} className="flex items-baseline gap-3 text-sm text-[#f4f4ef]/60">
                      <span className="text-[#2fe6c3]">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
