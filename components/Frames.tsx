"use client";

import Image from "next/image";

/**
 * Screenshots only read as *products* when they sit in something that looks like a
 * device. These two frames are deliberately understated — thin bezels, no glossy
 * skeuomorphism — so the work inside stays the loudest thing.
 */

export function BrowserFrame({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 900px) 92vw, 46vw",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0b0d10] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-[#111417] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="ml-3 h-3.5 flex-1 rounded-full bg-white/6" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  sizes = "220px",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border-[5px] border-[#16181c] bg-[#16181c] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="relative aspect-[430/868] overflow-hidden rounded-[1.6rem]">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {/* dynamic-island notch */}
      <div className="absolute left-1/2 top-2 h-[5px] w-14 -translate-x-1/2 rounded-full bg-black/55" />
      {/* soft glass sheen across the top-left corner */}
      <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.13),transparent_38%)]" />
    </div>
  );
}

/**
 * Fallback for client work that has no publishable screenshot. Rather than a grey
 * "no image" box, the card becomes typographic — which ends up reading as a
 * deliberate treatment rather than an absence.
 */
export function SpecPlate({
  name,
  kind,
  tech,
  accent = "#f2a312",
}: {
  name: string;
  kind: string;
  tech: string[];
  accent?: string;
}) {
  return (
    <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#0a0c0f] p-6 sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          background: `radial-gradient(120% 90% at 12% 0%, ${accent}33 0%, transparent 58%)`,
        }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative flex items-start justify-between gap-4">
        <span className="eyebrow text-[#f4f4ef]/50">{kind}</span>
        <span
          className="eyebrow font-mono-x rounded-full border px-2.5 py-1"
          style={{ borderColor: `${accent}59`, color: accent }}
        >
          NDA
        </span>
      </div>

      <div className="relative">
        <p className="font-accent text-[clamp(30px,4.4vw,54px)] leading-[1.05] text-[#f4f4ef]/92">{name}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="font-mono-x rounded border border-white/12 px-2 py-1 text-[10px] tracking-wide text-[#f4f4ef]/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
