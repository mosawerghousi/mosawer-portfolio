"use client";

import { motion } from "motion/react";
import GradientBg from "./GradientBg";
import { socials, profile } from "@/lib/data";

export default function Contacts() {
  return (
    <section id="contacts" className="relative w-full overflow-hidden">
      <GradientBg variant="hero" />

      <div className="relative z-10 flex min-h-svh flex-col justify-between px-[7vw] pb-10 pt-36">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(40px,7vw,110px)] font-medium leading-[0.98] tracking-[-0.02em] text-[#f4f4ef]"
        >
          Let&apos;s build
          <br />
          something <span className="font-accent text-[#f2a312]">lasting</span>
        </motion.h2>

        <div id="socials" className="mt-20 scroll-mt-32">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: "easeOut" }}
              className="group flex items-center justify-between border-t border-white/12 py-6 last:border-b sm:py-7"
            >
              <span className="text-[clamp(24px,4.6vw,60px)] font-semibold uppercase tracking-tight text-[#f4f4ef] transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#f2a312]">
                {s.label}
              </span>
              <span className="flex items-center gap-5">
                <span className="hidden text-[11px] font-semibold tracking-[0.14em] text-[#f4f4ef]/45 sm:block">
                  {s.meta}
                </span>
                <svg
                  width="26"
                  height="26"
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
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 flex flex-col gap-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f4f4ef]/40 sm:flex-row sm:justify-between"
        >
          <p>
            © {new Date().getFullYear()} {profile.name} — Kabul, Afghanistan
          </p>
          <p>Built with Next.js · Design inspired by Purrweb</p>
        </motion.footer>
      </div>
    </section>
  );
}
