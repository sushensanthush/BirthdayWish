/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useMemo } from "react";

interface Star {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  opacity: number;
}

const STAR_COLORS = ["#ff5d8f", "#ffa45b", "#b78ce8", "#4ed4b5", "#ffd166"];

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c1.1 6.9 5.1 10.9 12 12-6.9 1.1-10.9 5.1-12 12-1.1-6.9-5.1-10.9-12-12C6.9 10.9 10.9 6.9 12 0z" />
    </svg>
  );
}

export default function Backdrop() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: 8 + ((i * 7) % 14),
        delay: `${(i % 12) * 0.35}s`,
        duration: `${2 + (i % 5) * 0.7}s`,
        color: STAR_COLORS[i % STAR_COLORS.length],
        opacity: 0.5 + ((i * 13) % 40) / 100,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* soft gradient blobs */}
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-pink/15 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-lavender/20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-sun/20 blur-3xl" />
      <div className="absolute top-10 left-1/2 h-[18rem] w-[18rem] rounded-full bg-mint/10 blur-3xl" />

      {/* twinkling stars */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            color: s.color,
            opacity: s.opacity,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          <SparkleIcon />
        </span>
      ))}
    </div>
  );
}
