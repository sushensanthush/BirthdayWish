/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flame, Heart, Mail, RotateCcw, Sparkles } from "lucide-react";
import { wishGranted } from "../utils/confetti";
import { T } from "../config";
import { buildLetter } from "../data/letter";

const LETTER = buildLetter();

const CANDLE_COLORS = ["#ff5d8f", "#ffa45b", "#b78ce8", "#4ed4b5", "#ffd166"];

const SPRINKLES = [
  { left: "8%", top: "35%", rot: 24, color: "#ff5d8f" },
  { left: "86%", top: "30%", rot: -40, color: "#4ed4b5" },
  { left: "16%", top: "68%", rot: 70, color: "#ffd166" },
  { left: "80%", top: "62%", rot: -15, color: "#b78ce8" },
  { left: "10%", top: "30%", rot: 45, color: "#ffa45b" },
  { left: "88%", top: "28%", rot: -60, color: "#ff5d8f" },
  { left: "14%", top: "55%", rot: 10, color: "#4ed4b5" },
  { left: "84%", top: "50%", rot: -30, color: "#ffd166" },
];

function Drip({ color, className }: { color: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 18"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="0" y="0" width="200" height="6" fill={color} />
      <circle cx="12" cy="6" r="6" fill={color} />
      <circle cx="34" cy="8" r="4.5" fill={color} />
      <circle cx="55" cy="5" r="5.5" fill={color} />
      <circle cx="78" cy="9" r="4" fill={color} />
      <circle cx="97" cy="6" r="6" fill={color} />
      <circle cx="120" cy="8" r="4.5" fill={color} />
      <circle cx="141" cy="5" r="5.5" fill={color} />
      <circle cx="163" cy="9" r="4" fill={color} />
      <circle cx="185" cy="6" r="5.5" fill={color} />
    </svg>
  );
}

export default function Finale() {
  const [candles, setCandles] = useState<boolean[]>([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [wishMade, setWishMade] = useState(false);
  const [letterShown, setLetterShown] = useState(false);
  const celebrated = useRef(false);
  const letterRef = useRef<HTMLDivElement>(null);

  const litCount = candles.filter(Boolean).length;

  useEffect(() => {
    if (litCount === 0 && !celebrated.current) {
      celebrated.current = true;
      setWishMade(true);
      setLetterShown(true);
      wishGranted();
    }
  }, [litCount]);

  // Once the letter is unlocked, bring it into view after the confetti has started
  useEffect(() => {
    if (!letterShown) return;
    const id = window.setTimeout(() => {
      letterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 1400);
    return () => window.clearTimeout(id);
  }, [letterShown]);

  const blowOut = (i: number) => {
    setCandles((c) => c.map((v, idx) => (idx === i ? false : v)));
  };

  const relight = () => {
    celebrated.current = false;
    setWishMade(false);
    setCandles([true, true, true, true, true]);
  };

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-12 text-center md:px-6">
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center gap-2 rounded-full bg-ink px-5 py-2"
      >
        <Sparkles className="h-4 w-4 text-sun" />
        <span className="text-xs font-bold tracking-[0.3em] text-cream">
          THE GRAND FINALE
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="font-display text-[clamp(2.4rem,7vw,4.8rem)] leading-tight font-black"
      >
        Make a wish, <span className="italic text-pink">{T.name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-3 max-w-md text-sm font-medium text-ink/60 md:text-base"
      >
        {litCount > 0
          ? "Tap each candle to blow it out. Once the wish is made, a letter is waiting for you."
          : "All candles out. Wish received and urgently dispatched."}
      </motion.p>

      {/* ============ CAKE ============ */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.25 }}
        className="mt-12 mb-4 select-none"
      >
        {/* candles */}
        <div className="relative z-10 mx-auto flex w-fit items-end gap-5 pr-2 md:gap-7">
          {candles.map((lit, i) => (
            <button
              key={i}
              type="button"
              onClick={() => blowOut(i)}
              aria-label={
                lit ? `Blow out candle ${i + 1}` : `Candle ${i + 1} is out`
              }
              className="group relative flex cursor-pointer flex-col items-center"
            >
              {/* flame / smoke */}
              <span className="relative flex h-7 w-5 items-end justify-center">
                {lit ? (
                  <span className="flame block h-6 w-3.5 origin-bottom animate-flicker transition-transform duration-200 group-hover:scale-110" />
                ) : (
                  <span className="absolute bottom-0 h-3 w-3 rounded-full bg-ink/30 blur-[2px] animate-smoke" />
                )}
              </span>
              {/* wick */}
              <span className="h-2 w-[3px] rounded-full bg-ink/60" />
              {/* striped body */}
              <span
                className="block h-14 w-3.5 rounded-full border border-ink/15 shadow-inner md:h-16 md:w-4"
                style={{
                  background: `repeating-linear-gradient(135deg, #ffffff 0 5px, ${CANDLE_COLORS[i]} 5px 10px)`,
                }}
              />
            </button>
          ))}
        </div>

        {/* top tier */}
        <div className="relative mx-auto -mt-1 h-24 w-[15rem] rounded-t-2xl rounded-b-lg bg-gradient-to-b from-[#ffd9e8] to-[#ff9fc2] shadow-[inset_0_-10px_0_rgba(51,32,46,0.08)] md:h-28 md:w-[17rem]">
          <Drip
            color="#fff6ec"
            className="absolute -top-px left-0 h-5 w-full"
          />
          <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-black text-white/95 drop-shadow-[0_2px_0_rgba(51,32,46,0.2)]">
            {T.age}
          </span>
          {SPRINKLES.slice(0, 4).map((s, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-3.5 rounded-full"
              style={{
                left: s.left,
                top: s.top,
                backgroundColor: s.color,
                transform: `rotate(${s.rot}deg)`,
              }}
            />
          ))}
        </div>

        {/* bottom tier */}
        <div className="relative mx-auto -mt-2 h-28 w-[19rem] rounded-t-2xl rounded-b-xl bg-gradient-to-b from-[#c9a7eb] to-[#a37fd4] shadow-[inset_0_-12px_0_rgba(51,32,46,0.1)] md:h-32 md:w-[22rem]">
          <Drip
            color="#fff6ec"
            className="absolute -top-px left-0 h-5 w-full"
          />
          {SPRINKLES.slice(4).map((s, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-3.5 rounded-full"
              style={{
                left: s.left,
                top: s.top,
                backgroundColor: s.color,
                transform: `rotate(${s.rot}deg)`,
              }}
            />
          ))}
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-display text-sm font-bold tracking-[0.3em] text-white/80 uppercase">
            Happy Birthday
          </span>
        </div>

        {/* plate */}
        <div className="mx-auto -mt-2 h-5 w-[23rem] max-w-[96vw] rounded-full border-2 border-ink/10 bg-white/90 shadow-[0_10px_25px_-10px_rgba(51,32,46,0.35)] md:w-[26rem]" />
      </motion.div>

      {/* status / relight */}
      <div className="flex min-h-14 flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          {wishMade ? (
            <motion.div
              key="wish"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="flex items-center gap-2 rounded-full bg-mint px-6 py-3 text-sm font-bold text-white shadow-lg md:text-base">
                <Heart className="h-4 w-4 fill-white" />
                Wish received! Estimated delivery: right now.
              </p>
              <button
                type="button"
                onClick={relight}
                className="flex items-center gap-2 text-xs font-bold tracking-wide text-ink/45 uppercase transition-colors hover:text-pink"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Relight candles (practice wishing again)
              </button>
            </motion.div>
          ) : (
            <motion.p
              key="count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white/80 px-6 py-3 text-sm font-bold text-ink/70 backdrop-blur"
            >
              <Flame className="h-4 w-4 text-peach" />
              {litCount} flame{litCount === 1 ? "" : "s"} still dancing
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ============ LETTER ============ */}
      {letterShown && (
      <motion.div
        ref={letterRef}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-14 w-full max-w-2xl rounded-[2rem] border-2 border-ink/10 bg-white/95 p-7 text-left shadow-[0_24px_60px_-24px_rgba(51,32,46,0.35)] md:p-12"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pink/15">
            <Mail className="h-5 w-5 text-pink" />
          </span>
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] text-ink/45 uppercase">
              Priority delivery
            </p>
            <h3 className="font-display text-2xl font-black">
              A note from your {T.fromRole}
            </h3>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-[15px] leading-relaxed font-medium text-ink/80 md:text-base">
          {LETTER.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p className="font-display text-xl font-black text-ink">
            Your One and Only {T.FromRole},
          </p>
          {T.from && (
            <p className="font-display text-2xl italic text-pink">
              ~ {T.from}
            </p>
          )}
        </div>

        <div className="mt-7 flex flex-wrap gap-2 border-t-2 border-dashed border-ink/15 pt-6">
          {[
            `Level ${T.age}: unlocked`,
            "Sass: legendary",
            "Hug availability: 24/7",
            `Best ${T.toRole}: verified`,
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-cream px-4 py-1.5 text-xs font-bold text-ink/70"
            >
              {chip}
            </span>
          ))}
        </div>
      </motion.div>
      )}

      {/* footer */}
      <footer className="mt-14 pb-6 text-center">
        <div className="mx-auto mb-5 flex w-max items-center gap-2 rounded-full border-2 border-ink/10 bg-white/70 px-5 py-2 backdrop-blur">
          <Heart className="h-4 w-4 fill-pink text-pink" />
          <span className="text-xs font-bold tracking-[0.2em] text-ink/60 uppercase">
            Happy Birthday, {T.name}
          </span>
          <Heart className="h-4 w-4 fill-pink text-pink" />
        </div>
        <p className="text-[11px] font-semibold tracking-[0.25em] text-ink/40 uppercase">
          Made with love • {T.monthName} {T.day} • {T.bestDay}
        </p>
      </footer>
    </div>
  );
}
