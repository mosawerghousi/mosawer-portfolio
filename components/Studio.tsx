"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Counter, Reveal, SectionHead, WordReveal } from "./primitives";
import { about, profile, stats } from "@/lib/data";

export default function Studio() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrap,
    offset: ["start end", "end start"],
  });
  // Slow counter-drift inside the frame — the photo lags the page a little.
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="studio" className="relative w-full scroll-mt-24 overflow-hidden bg-[#06080a]">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-1/3 -left-[10%] h-[70vh] w-[45vw] rounded-full bg-[radial-gradient(closest-side,#1b4468aa,transparent_72%)] blur-2xl" />

      <div className="relative z-10 px-[var(--gutter)] py-28 sm:py-36">
        <SectionHead
          index="01"
          kicker="The studio"
          title={
            <>
              Software that has to
              <br />
              <span className="font-accent text-[#2fe6c3]">actually</span> work
            </>
          }
          note={
            <>
              Not demos. Accounting that balances, deploys that don&apos;t take production down,
              and RTL that survives contact with a real Dari-speaking user.
            </>
          }
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* portrait */}
          <Reveal>
            <div ref={imgWrap} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
                <motion.div style={{ y: imgY }} className="absolute inset-[-8%]">
                  <Image
                    src={profile.photo}
                    alt={`${profile.name} at work in Kabul`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="object-cover"
                  />
                </motion.div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080a] via-transparent to-transparent opacity-70" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 ring-inset" />
              </div>

              {/* caption plate, overlapping the frame's bottom edge */}
              <div className="absolute -right-3 -bottom-6 max-w-[220px] rounded-xl border border-white/12 bg-[#0b0d10]/90 px-5 py-4 backdrop-blur-md sm:-right-6">
                <p className="eyebrow text-[#f2a312]">Mosawer Ghousi</p>
                <p className="mt-2 text-[11px] leading-relaxed text-[#f4f4ef]/60">
                  {profile.role}
                  <br />
                  {profile.location}
                </p>
              </div>
            </div>
          </Reveal>

          {/* copy */}
          <div>
            <WordReveal
              text="I build end-to-end* yet reliable & visually refined products for the web and mobile."
              className="max-w-[520px] text-[clamp(24px,2.7vw,38px)] leading-[1.32] font-medium text-[#f4f4ef]"
            />

            <div className="mt-12 max-w-[560px] space-y-6">
              {about.map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-[15px] leading-[1.75] text-[#f4f4ef]/62">{para}</p>
                </Reveal>
              ))}
            </div>

            <div className="rule-fade mt-14" />

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.07}>
                  <div>
                    <p className="font-mono-x text-[clamp(30px,3.6vw,46px)] leading-none font-medium tracking-[-0.03em] text-[#f4f4ef] tabular-nums">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-3 text-[10px] leading-relaxed font-semibold tracking-[0.13em] whitespace-pre-line text-[#f4f4ef]/45 uppercase">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
