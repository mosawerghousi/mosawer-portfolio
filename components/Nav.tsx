"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { navLinks, profile } from "@/lib/data";
import { scrollToSection } from "./SmoothScroll";

export default function Nav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const ids = ["playbook", "socials", "contacts"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    ids.forEach((id) => {
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

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-[7vw] py-6 text-[11px] font-semibold tracking-[0.14em] text-white sm:grid sm:grid-cols-4 sm:gap-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="justify-self-start whitespace-nowrap text-[12px] font-bold tracking-[0.12em]"
        >
          {profile.shortName}
        </button>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollToSection(link.href)}
            className={`group relative hidden whitespace-nowrap uppercase sm:block ${
              link.href === "#contacts" ? "justify-self-end" : "justify-self-start"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                active === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
        ))}
        <button
          onClick={() => scrollToSection("#contacts")}
          className="uppercase sm:hidden"
        >
          Contacts
        </button>
      </nav>
    </motion.header>
  );
}
