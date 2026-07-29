"use client";

import { motion } from "motion/react";

type Blob = {
  color: string;
  className: string;
  opacity: number;
  animate: { x: number[]; y: number[]; scale: number[] };
  duration: number;
};

const heroBlobs: Blob[] = [
  {
    color: "#1c4a72",
    className: "left-[50%] top-[-30%] h-[95vh] w-[60vw]",
    opacity: 0.65,
    animate: { x: [0, -80, 40, 0], y: [0, 60, -30, 0], scale: [1, 1.2, 0.95, 1] },
    duration: 26,
  },
  {
    color: "#0e3535",
    className: "left-[8%] top-[20%] h-[80vh] w-[52vw]",
    opacity: 0.6,
    animate: { x: [0, 90, -60, 0], y: [0, -50, 40, 0], scale: [1, 0.9, 1.15, 1] },
    duration: 30,
  },
  {
    color: "#1b4468",
    className: "left-[62%] top-[35%] h-[85vh] w-[48vw]",
    opacity: 0.5,
    animate: { x: [0, -70, 30, 0], y: [0, -60, 50, 0], scale: [1, 1.1, 0.9, 1] },
    duration: 22,
  },
  {
    color: "#0a2a3d",
    className: "left-[-18%] top-[50%] h-[75vh] w-[48vw]",
    opacity: 0.55,
    animate: { x: [0, 60, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 1, 1] },
    duration: 34,
  },
];

const vividBlobs: Blob[] = [
  {
    color: "#8d1d5f",
    className: "left-[-18%] top-[-20%] h-[100vh] w-[58vw]",
    opacity: 0.85,
    animate: { x: [0, 70, -50, 0], y: [0, 50, -40, 0], scale: [1, 1.2, 0.95, 1] },
    duration: 24,
  },
  {
    color: "#dfa422",
    className: "left-[-20%] top-[38%] h-[95vh] w-[52vw]",
    opacity: 0.8,
    animate: { x: [0, 80, -30, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.9, 1] },
    duration: 28,
  },
  {
    color: "#0fbf95",
    className: "left-[40%] top-[-30%] h-[105vh] w-[62vw]",
    opacity: 0.75,
    animate: { x: [0, -90, 50, 0], y: [0, 70, -30, 0], scale: [1, 0.92, 1.18, 1] },
    duration: 26,
  },
  {
    color: "#d84427",
    className: "left-[25%] top-[55%] h-[90vh] w-[70vw]",
    opacity: 0.75,
    animate: { x: [0, -60, 70, 0], y: [0, -50, 20, 0], scale: [1, 1.15, 0.95, 1] },
    duration: 30,
  },
  {
    color: "#4d1f78",
    className: "left-[20%] top-[12%] h-[80vh] w-[48vw]",
    opacity: 0.7,
    animate: { x: [0, 60, -70, 0], y: [0, 40, -50, 0], scale: [1, 1.1, 1, 1] },
    duration: 32,
  },
];

export default function GradientBg({ variant }: { variant: "hero" | "vivid" }) {
  const blobs = variant === "hero" ? heroBlobs : vividBlobs;
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ background: variant === "hero" ? "#05070a" : "#160b18" }}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute ${b.className}`}
          style={{
            opacity: b.opacity,
            background: `radial-gradient(closest-side, ${b.color} 0%, ${b.color}cc 30%, transparent 72%)`,
          }}
          animate={b.animate}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* darken edges like the reference vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
