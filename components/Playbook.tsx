"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import GradientBg from "./GradientBg";
import { playCards, type PlayCard } from "@/lib/data";

const introWords = [
  "I",
  "am",
  "Mosawer",
  "Ghousi,",
  "I",
  "build",
  "end-to-end*",
  "yet",
  "reliable",
  "&",
  "visually",
  "refined",
  "products",
  "for",
  "the",
  "web",
  "and",
  "mobile",
];

function Laptop({ image, title }: { image: string; title: string }) {
  return (
    <div className="w-[78%] max-w-[430px]">
      <div className="overflow-hidden rounded-t-xl border border-white/10 bg-black">
        <div className="relative aspect-[16/10]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 80vw, 430px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="rounded-b-xl bg-[#e8e6df] px-4 pb-3 pt-2">
        <div className="grid grid-cols-12 gap-1.5">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="h-2.5 rounded-full bg-[#101010]" />
          ))}
        </div>
        <div className="mx-auto mt-1.5 h-2.5 w-1/3 rounded-full bg-[#101010]" />
      </div>
    </div>
  );
}

function Phones({ images, title }: { images: string[]; title: string }) {
  const rotations = ["-rotate-6 translate-y-4", "rotate-0 -translate-y-2", "rotate-6 translate-y-4"];
  return (
    <div className="flex items-center justify-center">
      {images.map((img, i) => (
        <div
          key={img}
          className={`relative -mx-3 w-[120px] overflow-hidden rounded-[18px] border-[3px] border-black bg-black shadow-2xl sm:w-[140px] ${rotations[i]}`}
        >
          <div className="relative aspect-[430/868]">
            <Image
              src={img}
              alt={`${title} screen ${i + 1}`}
              fill
              sizes="140px"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({ card, onArrow }: { card: PlayCard; onArrow?: () => void }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-[#0c0c0d] p-7 sm:p-9">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h3 className="whitespace-nowrap text-[clamp(26px,3.4vw,44px)] font-semibold tracking-tight text-[#f4f4ef]">
            {card.title}
          </h3>
          <p className="mt-2 text-[10px] font-semibold tracking-[0.16em] text-[#f4f4ef]/45">
            {card.sub}
          </p>
        </div>
        <div className="mt-4 hidden h-px flex-1 bg-white/25 sm:block" />
      </div>
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${card.title}`}
        onClick={(e) => e.stopPropagation()}
        className="group mt-6 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 hover:border-white hover:bg-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-[#f4f4ef] transition-all duration-300 group-hover:-rotate-45 group-hover:text-black"
        >
          <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </a>
      <div className="mt-6 flex flex-1 items-end justify-center overflow-hidden">
        {card.kind === "laptop" ? (
          <Laptop image={card.images[0]} title={card.title} />
        ) : (
          <Phones images={card.images} title={card.title} />
        )}
      </div>
      {onArrow ? null : null}
    </div>
  );
}

export default function Playbook() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = playCards.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setActive((a) => (a + 1) % n), [n]);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(next, 4200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, next]);

  const posFor = (i: number) => (i - active + n) % n;

  const variants = [
    { x: "0%", y: 0, scale: 1, opacity: 1, zIndex: 40, filter: "brightness(1)" }, // front
    { x: "72%", y: 20, scale: 0.96, opacity: 1, zIndex: 30, filter: "brightness(0.85)" }, // peeking right
    { x: "5%", y: -46, scale: 0.955, opacity: 0.9, zIndex: 20, filter: "brightness(0.5)" }, // behind top
    { x: "2%", y: -86, scale: 0.91, opacity: 0.7, zIndex: 10, filter: "brightness(0.35)" }, // far back
  ];

  return (
    <section id="playbook" className="relative w-full overflow-hidden py-28 sm:py-0">
      <GradientBg variant="vivid" />

      <div className="relative z-10 grid min-h-svh items-center gap-16 px-[7vw] sm:grid-cols-[1fr_1.1fr] sm:gap-8 sm:py-32">
        {/* Intro text */}
        <div>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.045 }}
            className="max-w-[480px] text-[clamp(26px,2.9vw,40px)] font-medium leading-[1.35] text-[#f4f4ef]"
          >
            {introWords.map((word, i) => {
              const accent = word.endsWith("*");
              const clean = accent ? word.slice(0, -1) : word;
              return (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
                    show: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  className={
                    accent
                      ? "font-accent mr-[0.28em] inline-block text-[#2fe6c3]"
                      : "mr-[0.28em] inline-block"
                  }
                >
                  {clean}
                </motion.span>
              );
            })}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4f4ef]/55 sm:text-[11px]"
          >
            Full-stack / DevOps /<br />
            UI engineering
          </motion.p>
        </div>

        {/* Card deck */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <div className="relative h-[480px] w-full sm:h-[540px]">
            {playCards.map((card, i) => {
              const pos = posFor(i);
              return (
                <motion.div
                  key={card.key}
                  onClick={() => pos !== 0 && setActive(i)}
                  animate={variants[pos]}
                  transition={{ type: "spring", stiffness: 210, damping: 28 }}
                  style={{ zIndex: variants[pos].zIndex }}
                  className={`absolute inset-0 ${pos !== 0 ? "cursor-pointer" : ""}`}
                >
                  <Card card={card} />
                </motion.div>
              );
            })}
          </div>
          {/* pagination dots */}
          <div className="relative z-40 mt-8 flex items-center justify-center gap-3">
            {playCards.map((card, i) => (
              <button
                key={card.key}
                onClick={() => setActive(i)}
                aria-label={`Show ${card.title}`}
                className={`h-2 w-2 rounded-full border transition-all duration-300 ${
                  i === active
                    ? "border-[#2fe6c3] bg-[#2fe6c3]"
                    : "border-white/50 bg-transparent hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
