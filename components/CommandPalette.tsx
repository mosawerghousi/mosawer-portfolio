"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, profile, rankedProjects } from "@/lib/data";
import { scrollToSection } from "./SmoothScroll";

type Item = {
  id: string;
  label: string;
  hint: string;
  group: string;
  run: () => void;
};

/**
 * ⌘K jump-to. With thirty-odd builds on one page, scrolling to a specific
 * project is genuinely slow — this makes the catalogue addressable.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.85));

  const items = useMemo<Item[]>(
    () => [
      ...navLinks.map((l) => ({
        id: `nav${l.href}`,
        label: l.label.charAt(0) + l.label.slice(1).toLowerCase(),
        hint: "Section",
        group: "Jump to",
        run: () => scrollToSection(l.href),
      })),
      ...rankedProjects.map((p) => ({
        id: p.key,
        label: p.name,
        hint: p.kind,
        group: "Work",
        run: () => {
          scrollToSection("#work");
          // The grid is on the page already; open the card once we've landed on it.
          setTimeout(() => window.dispatchEvent(new CustomEvent("open-project", { detail: p.key })), 900);
        },
      })),
      {
        id: "email",
        label: "Email Mosawer",
        hint: profile.email,
        group: "Contact",
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "@mosawerghousi",
        group: "Contact",
        run: () => window.open(profile.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "in/mosawerghousi",
        group: "Contact",
        run: () => window.open(profile.linkedin, "_blank", "noopener"),
      },
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.hint.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setCursor(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const choose = (item: Item) => {
    setOpen(false);
    item.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      e.preventDefault();
      choose(results[cursor]);
    }
  };

  let lastGroup = "";

  return (
    <>
      {/*
        Discoverability hint — a shortcut nobody knows about may as well not exist.
        It waits until the hero has scrolled past so it doesn't crowd the availability pill.
      */}
      <motion.button
        onClick={() => setOpen(true)}
        data-cursor="Search"
        aria-label="Open command palette"
        initial={false}
        animate={{ opacity: pastHero ? 1 : 0, y: pastHero ? 0 : 12 }}
        style={{ pointerEvents: pastHero ? "auto" : "none" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed right-[var(--gutter)] bottom-6 z-[68] hidden items-center gap-2 rounded-full border border-white/12 bg-[#0b0d10]/80 px-4 py-2.5 backdrop-blur-md transition-colors hover:border-[#f2a312]/60 lg:inline-flex"
      >
        <span className="eyebrow text-[#f4f4ef]/50">Search</span>
        <kbd className="font-mono-x rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-[#f4f4ef]/60">
          ⌘K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-start justify-center p-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="fixed inset-0 bg-[#040507]/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.985 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/12 bg-[#0a0b0e] shadow-[0_40px_100px_-24px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="5" stroke="#f4f4ef" strokeOpacity="0.4" strokeWidth="1.4" />
                  <path d="M11 11l3.5 3.5" stroke="#f4f4ef" strokeOpacity="0.4" strokeWidth="1.4" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setCursor(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Search projects, sections, links…"
                  className="w-full bg-transparent text-[15px] text-[#f4f4ef] outline-none placeholder:text-[#f4f4ef]/30"
                />
                <kbd className="font-mono-x shrink-0 rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-[#f4f4ef]/45">
                  ESC
                </kbd>
              </div>

              <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
                {results.length === 0 ? (
                  <p className="px-5 py-8 text-center text-sm text-[#f4f4ef]/35">
                    Nothing matches “{query}”.
                  </p>
                ) : (
                  results.map((item, i) => {
                    const showGroup = item.group !== lastGroup;
                    lastGroup = item.group;
                    return (
                      <div key={item.id}>
                        {showGroup ? (
                          <p className="eyebrow px-5 pt-4 pb-2 text-[#f4f4ef]/30">{item.group}</p>
                        ) : null}
                        <button
                          onMouseEnter={() => setCursor(i)}
                          onClick={() => choose(item)}
                          className={`flex w-full items-center justify-between gap-4 px-5 py-2.5 text-left transition-colors ${
                            i === cursor ? "bg-white/[0.06]" : ""
                          }`}
                        >
                          <span className="truncate text-[14px] text-[#f4f4ef]/85">{item.label}</span>
                          <span className="shrink-0 truncate text-[11px] text-[#f4f4ef]/35">
                            {item.hint}
                          </span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-white/8 px-5 py-3">
                <span className="eyebrow text-[#f4f4ef]/30">↑↓ navigate</span>
                <span className="eyebrow text-[#f4f4ef]/30">↵ open</span>
                <span className="eyebrow ml-auto text-[#f4f4ef]/30">{results.length} results</span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
