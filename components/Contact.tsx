"use client";

import { useState } from "react";
import { motion } from "motion/react";
import GradientBg from "./GradientBg";
import { Magnetic, MaskLines, Reveal } from "./primitives";
import { profile, socials } from "@/lib/data";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard is permission-gated; the mailto link below still works.
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      onClick={copy}
      data-cursor={copied ? "Copied" : "Copy"}
      className="group inline-flex items-center gap-3 text-sm text-[#f4f4ef]/55 transition-colors hover:text-[#f4f4ef]"
    >
      <span className="font-mono-x">{profile.email}</span>
      <span className="eyebrow rounded border border-white/15 px-2 py-1 transition-colors group-hover:border-[#2fe6c3]/60 group-hover:text-[#2fe6c3]">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative w-full scroll-mt-24 overflow-hidden">
      <GradientBg variant="hero" />

      <div className="relative z-10 flex min-h-svh flex-col justify-between px-[var(--gutter)] pt-32 pb-10 sm:pt-40">
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="eyebrow font-mono-x text-[#f2a312]">06</span>
              <span className="h-px w-10 bg-[#f2a312]/50" />
              <span className="eyebrow text-[#f4f4ef]/55">Contact</span>
            </div>
          </Reveal>

          <MaskLines
            className="mt-8 block text-[clamp(40px,7.6vw,118px)] leading-[0.98] font-medium tracking-[-0.025em] text-[#f4f4ef]"
            lines={[
              <>Let&apos;s build</>,
              <>
                something <span className="font-accent text-[#f2a312]">lasting</span>
              </>,
            ]}
          />

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="Write"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#f2a312] px-8 py-4 text-[11px] font-semibold tracking-[0.16em] text-[#06080a] uppercase"
                >
                  Start a project
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 10h13M11 4.5 16.5 10 11 15.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </svg>
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
          </Reveal>
        </div>

        <div id="socials" className="mt-20 scroll-mt-32">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-cursor="Open"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: "easeOut" }}
              className="group flex items-center justify-between border-t border-white/12 py-5 last:border-b sm:py-6"
            >
              <span className="text-[clamp(22px,4.4vw,54px)] font-semibold tracking-tight text-[#f4f4ef] uppercase transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#f2a312]">
                {s.label}
              </span>
              <span className="flex items-center gap-5">
                <span className="hidden text-[11px] font-semibold tracking-[0.14em] text-[#f4f4ef]/45 sm:block">
                  {s.meta}
                </span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 26 26"
                  fill="none"
                  className="text-[#f4f4ef]/60 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#f2a312]"
                >
                  <path d="M6 20 20 6M9 6h11v11" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 flex flex-col gap-3 pb-2 text-[10px] font-semibold tracking-[0.14em] text-[#f4f4ef]/40 uppercase sm:flex-row sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()} {profile.name} — {profile.location}
          </p>
          <p>{profile.availability}</p>
          <p>Next.js · Motion · Designed &amp; built by Mosawer</p>
        </motion.footer>
      </div>
    </section>
  );
}
