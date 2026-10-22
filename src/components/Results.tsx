/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight, Crown, Heart, RotateCcw, Trophy } from "lucide-react";
import { getResult } from "../data/quiz";
import { grandFinale } from "../utils/confetti";
import { T } from "../config";

const RESULT_ICONS = {
  crown: Crown,
  trophy: Trophy,
  alert: AlertTriangle,
  heart: Heart,
};

export default function Results({
  score,
  total,
  onContinue,
  onRetry,
}: {
  score: number;
  total: number;
  onContinue: () => void;
  onRetry: () => void;
}) {
  const [display, setDisplay] = useState(0);
  const result = getResult(score);
  const Icon = RESULT_ICONS[result.icon];

  useEffect(() => {
    grandFinale();
  }, []);

  // playful count-up
  useEffect(() => {
    if (display >= score) return;
    const id = window.setTimeout(() => setDisplay((d) => d + 1), 170);
    return () => window.clearTimeout(id);
  }, [display, score]);

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 py-12 text-center md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-center gap-2 rounded-full bg-ink px-5 py-2"
      >
        <Trophy className="h-4 w-4 text-sun" />
        <span className="text-xs font-bold tracking-[0.3em] text-cream">EXAM COMPLETE</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-tight font-black"
      >
        You scored{" "}
        <span className="relative inline-block text-pink">
          {display}/{total}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -bottom-1 left-0 h-2 w-full origin-left rounded-full bg-sun md:-bottom-2 md:h-3"
          />
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="mt-8 flex items-center gap-3 rounded-2xl border-2 border-ink/10 bg-white/90 px-7 py-5 shadow-[0_16px_40px_-18px_rgba(51,32,46,0.3)]"
      >
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sun/25">
          <Icon className="h-7 w-7 text-ink" />
        </span>
        <div className="text-left">
          <p className="font-display text-xl font-black md:text-2xl">{result.title}</p>
          <p className="mt-0.5 max-w-md text-sm font-medium text-ink/60">{result.sub}</p>
        </div>
      </motion.div>

      {/* certificate */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.6, delay: 0.55 }}
        className="ticket-edge mt-10 w-full max-w-xl border-2 border-dashed border-ink/30 bg-white/95 px-6 py-8 md:px-10"
      >
        <p className="text-[10px] font-bold tracking-[0.4em] text-ink/50 uppercase md:text-xs">
          The Official Family Registry
        </p>
        <h3 className="mt-2 font-display text-2xl font-black tracking-tight md:text-3xl">
          Certificate of{" "}
          <span className="italic text-pink">
            {T.FromRole}'s {T.toRole.charAt(0).toUpperCase() + T.toRole.slice(1)}
          </span>
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed font-medium text-ink/70 md:text-base">
          This certifies that <span className="font-black text-ink">{T.NAME}</span> has successfully
          completed {T.age} years of being adorable, dramatic, and impossible not to love and is
          hereby promoted to <span className="font-black text-ink">Level {T.age}</span>.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {[`${T.age} years of sass`, "Certified cute", "Boss-level drama", `${T.FromRole}'s hero`].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-cream px-3.5 py-1.5 text-xs font-bold text-ink/70"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between border-t-2 border-dashed border-ink/20 pt-4">
          <div className="text-left">
            <p className="font-display text-lg italic">The Management</p>
            <p className="text-[10px] font-bold tracking-[0.25em] text-ink/50 uppercase">
              ({T.bigFromRole.replace(/^./, (c) => c.toUpperCase())}{T.from ? `, ${T.from}` : ""})
            </p>
          </div>
          <div className="relative flex h-20 w-20 items-center justify-center">
            <span className="absolute inset-0 animate-spin-slower">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="seal-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-ink/60 text-[9px] font-bold tracking-[0.28em]">
                  <textPath href="#seal-circle">OFFICIAL • BIRTHDAY • SEAL •</textPath>
                </text>
              </svg>
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pink font-display text-xs font-black text-white shadow-[0_3px_0_rgba(51,32,46,0.2)]">
              {T.age}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <motion.button
          whileHover={{ scale: 1.04, rotate: 1 }}
          whileTap={{ scale: 0.96 }}
          onClick={onContinue}
          className="group flex items-center gap-3 rounded-full bg-pink px-9 py-4 text-base font-bold text-white shadow-[0_10px_0_rgba(230,57,86,0.35)] md:text-lg"
        >
          Claim your cake
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full border-2 border-ink/20 bg-white/80 px-7 py-4 text-sm font-bold text-ink/70 transition-colors hover:border-ink hover:text-ink"
        >
          <RotateCcw className="h-4 w-4" />
          Retake the exam
        </motion.button>
      </motion.div>
    </div>
  );
}
