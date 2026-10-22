/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cake, Heart, PartyPopper, Sparkles } from "lucide-react";
import { CONFIG, T } from "../config";

/** Scale the big name down for long names so it never overflows on small screens */
const NAME_FONT_SIZE =
  T.name.length > 13
    ? "clamp(1.8rem, 6.2vw, 5rem)"
    : T.name.length > 8
      ? "clamp(2.4rem, 8.5vw, 6.5rem)"
      : "clamp(3rem, 11vw, 9rem)";

/** Rotating badge text is fitted to the circle (circumference of r=37) */
const BADGE_PATH_LENGTH = 232;
const BADGE_UNIT = `${T.NAME} TURNS ${T.age} •`;
const BADGE_TEXT = `${BADGE_UNIT} ${BADGE_UNIT}`;
const BADGE_FONT_SIZE = Math.min(10.5, BADGE_PATH_LENGTH / (BADGE_TEXT.length * 0.72));

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

/** Live countdown to the next birthday */
function Countdown() {
  const now = useNow();
  const m = CONFIG.month - 1;
  const d = CONFIG.day;
  const isBirthday = now.getMonth() === m && now.getDate() === d;
  const year =
    now.getMonth() > m || (now.getMonth() === m && now.getDate() > d)
      ? now.getFullYear() + 1
      : now.getFullYear();
  const target = new Date(year, m, d, 0, 0, 0).getTime();
  const diff = Math.max(0, target - now.getTime());

  const units = [
    { label: "days", value: Math.floor(diff / 86_400_000) },
    { label: "hours", value: Math.floor(diff / 3_600_000) % 24 },
    { label: "mins", value: Math.floor(diff / 60_000) % 60 },
    { label: "secs", value: Math.floor(diff / 1_000) % 60 },
  ];

  if (isBirthday) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-8 flex items-center gap-3 rounded-full bg-gradient-to-r from-pink to-peach px-7 py-3 shadow-lg"
      >
        <PartyPopper className="h-5 w-5 text-white" />
        <span className="text-sm font-black tracking-[0.25em] text-white md:text-base">
          IT'S TODAY, HAPPY BIRTHDAY!
        </span>
      </motion.div>
    );
  }

  return (
    <div className="mt-8 flex items-center gap-2.5 md:gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-16 flex-col items-center rounded-2xl border-2 border-ink/10 bg-white/85 px-3 py-2 shadow-sm backdrop-blur md:min-w-20 md:px-4"
        >
          <span className="font-display text-2xl leading-none font-black tabular-nums md:text-3xl">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[9px] font-bold tracking-[0.2em] text-ink/50 uppercase md:text-[10px]">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

interface BalloonProps {
  color: string;
  className: string;
  delay: number;
  size?: number;
}

function Balloon({ color, className, delay, size = 64 }: BalloonProps) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-0 ${className}`}
      animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <svg width={size} height={size * 1.5} viewBox="0 0 64 96" fill="none">
        <ellipse cx="32" cy="30" rx="26" ry="33" fill={color} />
        <ellipse cx="22" cy="20" rx="7" ry="10" fill="#ffffff" opacity="0.35" />
        <path d="M27 61 L37 61 L32 71 Z" fill={color} />
        <path d="M32 71 C 26 80, 38 86, 32 95" stroke="#33202e" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

const MARQUEE_ITEMS = [
  `HAPPY ${T.ageOrdinal.toUpperCase()} BIRTHDAY`,
  T.NAME,
  `${T.monthName.toUpperCase()} ${T.day}`,
  T.isAdult ? "OFFICIALLY AN ADULT" : "LEVEL UP UNLOCKED",
  "CAKE UNLOCKED",
  "MAKE A WISH",
];

function MarqueeStrip({ dark = true }: { dark?: boolean }) {
  const row = (
    <>
      {MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center gap-6 md:gap-10">
          <span
            className={`font-display text-sm font-bold tracking-[0.25em] md:text-base ${
              dark ? "text-cream" : "text-ink"
            }`}
          >
            {item}
          </span>
          <Sparkles className={`h-4 w-4 shrink-0 ${dark ? "text-sun" : "text-pink"}`} />
        </span>
      ))}
    </>
  );

  return (
    <div
      className={`overflow-hidden py-3.5 md:py-4 ${
        dark ? "-rotate-1 scale-105 bg-ink shadow-lg" : "rotate-1 bg-white/70 backdrop-blur"
      }`}
    >
      <div className="flex w-max animate-marquee gap-6 pr-6 md:gap-10 md:pr-10">
        {row}
        {row}
      </div>
    </div>
  );
}

export default function Hero({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col">
      {/* top bar */}
      <header className="flex items-center justify-between px-5 py-5 md:px-10">
        <div className="flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur">
          <Cake className="h-4 w-4 text-pink" />
          <span className="text-xs font-bold tracking-widest md:text-sm">
            {T.monthShort.toUpperCase()} {T.day}
          </span>
        </div>
        <div className="hidden items-center gap-2 rounded-full border-2 border-ink/10 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur sm:flex">
          <PartyPopper className="h-4 w-4 text-peach" />
          <span className="text-xs font-semibold tracking-wide text-ink/70 md:text-sm">
            A very serious celebration
          </span>
        </div>
      </header>

      {/* balloons */}
      <Balloon color="#ff5d8f" className="left-[4%] top-[14%]" delay={0} size={78} />
      <Balloon color="#b78ce8" className="right-[5%] top-[10%] hidden md:block" delay={1.2} size={64} />
      <Balloon color="#4ed4b5" className="left-[10%] bottom-[22%] hidden lg:block" delay={0.6} size={52} />
      <Balloon color="#ffd166" className="right-[12%] bottom-[26%] hidden sm:block" delay={1.8} size={56} />
      <Balloon color="#ffa45b" className="right-[26%] top-[6%] hidden xl:block" delay={0.3} size={46} />

      {/* main content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex items-center gap-2 rounded-full bg-pink px-5 py-2 shadow-[0_8px_0_rgba(51,32,46,0.15)]"
        >
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-xs font-bold tracking-[0.3em] text-white md:text-sm">
            THE OFFICIAL BIRTHDAY EXAM
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[0.95] font-black tracking-tight"
        >
          Happy
          <br />
          <span className="relative inline-block">
            <span className="font-display italic text-pink">Birthday</span>
            {/* spinning badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.7 }}
              className="absolute -top-8 -right-10 hidden h-24 w-24 sm:block md:-right-16 md:h-28 md:w-28"
            >
              <span className="absolute inset-0 animate-spin-slower">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                  </defs>
                  <text className="fill-ink font-bold" style={{ fontSize: BADGE_FONT_SIZE }}>
                    <textPath href="#badge-circle" textLength={BADGE_PATH_LENGTH} lengthAdjust="spacing">
                      {BADGE_TEXT}
                    </textPath>
                  </text>
                </svg>
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun font-display text-lg font-black shadow-[0_4px_0_rgba(51,32,46,0.2)] md:h-14 md:w-14 md:text-xl">
                  {T.age}
                </span>
              </span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-2 flex items-center gap-4 md:gap-6"
        >
          <span className="hidden h-1.5 w-14 rounded-full bg-mint md:block" />
          <h2
            className="font-display leading-none font-black tracking-tight text-ink"
            style={{ fontSize: NAME_FONT_SIZE }}
          >
            {T.NAME}
            <span className="text-peach">!</span>
          </h2>
          <span className="hidden h-1.5 w-14 rounded-full bg-lavender md:block" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-7 max-w-xl text-base leading-relaxed font-medium text-ink/70 md:text-lg"
        >
          You've survived {T.age} full years of being the cutest menace around.
          Before the cake is released, you must pass a <span className="font-bold text-ink">very serious official exam</span>{" "}
          designed by your favorite {T.favoriteNoun} (me).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 flex flex-col items-center"
        >
          <p className="mb-3 text-[10px] font-bold tracking-[0.35em] text-ink/45 uppercase md:text-xs">
            Countdown to the big day
          </p>
          <Countdown />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          whileHover={{ scale: 1.04, rotate: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="group mt-10 flex items-center gap-3 rounded-full bg-ink px-9 py-4 text-base font-bold text-cream shadow-[0_10px_0_rgba(51,32,46,0.25)] transition-shadow hover:shadow-[0_14px_0_rgba(51,32,46,0.25)] md:text-lg"
        >
          Start the exam
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-5 flex items-center gap-1.5 text-xs font-medium text-ink/50 md:text-sm"
        >
          <Heart className="h-3.5 w-3.5 fill-pink text-pink" />
          Warning: contains jokes, cake, and unconditional love
        </motion.p>
      </main>

      {/* marquee */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="relative z-10 pb-8"
      >
        <MarqueeStrip />
        <p className="mt-5 text-center text-[11px] font-semibold tracking-[0.25em] text-ink/40 uppercase">
          Made with love by your {T.fromRole} • Level {T.age} unlocked
        </p>
      </motion.footer>
    </div>
  );
}
