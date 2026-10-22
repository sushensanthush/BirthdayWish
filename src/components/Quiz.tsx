/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ClipboardList, Cake, Star, XCircle } from "lucide-react";
import { QUESTIONS } from "../data/quiz";
import { correctBurst } from "../utils/confetti";

interface QuizProps {
  onFinish: (score: number) => void;
  onSkip: () => void;
}

const LETTERS = ["A", "B", "C", "D"];

export default function Quiz({ onFinish, onSkip }: QuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const timeouts = useRef<number[]>([]);
  const alive = useRef(true);

  const question = QUESTIONS[index];
  const total = QUESTIONS.length;
  const isAccepted = (i: number) =>
    question.correct.length === 0 || question.correct.includes(i);

  useEffect(() => {
    const ids = timeouts.current;
    return () => {
      alive.current = false;
      ids.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const skip = () => {
    timeouts.current.forEach((id) => window.clearTimeout(id));
    onSkip();
  };

  const choose = (i: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    const ok = isAccepted(i);
    if (ok) {
      setScore((s) => s + 1);
      correctBurst();
      setFeedback({ ok: true, msg: question.correctMsg });
    } else {
      setFeedback({ ok: false, msg: question.wrongMsg });
    }
    const id = window.setTimeout(
      () => {
        if (index + 1 < total) {
          setIndex((v) => v + 1);
          setSelected(null);
          setAnswered(false);
          setFeedback(null);
        } else {
          onFinish(ok ? score + 1 : score);
        }
      },
      ok ? 2100 : 2600
    );
    timeouts.current.push(id);
  };

  const progress = ((index + (answered ? 1 : 0)) / total) * 100;

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-4 py-10 md:px-6">
      {/* header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 rounded-full border-2 border-ink/10 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur">
          <ClipboardList className="h-4 w-4 text-lavender" />
          <span className="text-[11px] font-bold tracking-[0.2em] md:text-xs">
            QUESTION {index + 1} / {total}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 shadow-sm">
          <Star className="h-4 w-4 fill-sun text-sun" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-cream md:text-xs">
            {score} CORRECT
          </span>
        </div>
      </div>

      {/* progress bar */}
      <div className="mb-8 h-3 w-full overflow-hidden rounded-full border-2 border-ink/10 bg-white/70">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-pink via-peach to-sun"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      {/* card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 70, rotate: 1 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          exit={{ opacity: 0, x: -70, rotate: -1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-[2rem] border-2 border-ink/10 bg-white/90 p-6 shadow-[0_20px_50px_-20px_rgba(51,32,46,0.25)] backdrop-blur md:p-10"
        >
          <span className="inline-block rounded-full bg-lavender/20 px-4 py-1 text-[11px] font-bold tracking-[0.2em] text-lavender uppercase">
            {question.tag}
          </span>

          <h2 className="mt-4 font-display text-2xl leading-snug font-bold md:text-4xl">
            {question.question}
          </h2>

          <div className="mt-7 grid gap-3 md:mt-9">
            {question.options.map((opt, i) => {
              const isSelected = selected === i;
              const revealCorrect = answered && isAccepted(i);
              const revealWrong = answered && isSelected && !isAccepted(i);
              const dimmed = answered && !isSelected && !isAccepted(i);

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={answered}
                  whileHover={!answered ? { scale: 1.015, y: -2 } : undefined}
                  whileTap={!answered ? { scale: 0.98 } : undefined}
                  animate={revealWrong ? { x: [0, -10, 10, -6, 6, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-colors duration-200 ${
                    revealCorrect
                      ? "border-mint bg-mint/10"
                      : revealWrong
                        ? "border-cherry bg-cherry/10"
                        : dimmed
                          ? "border-ink/10 bg-white opacity-45"
                          : "border-ink/15 bg-white hover:border-ink hover:bg-cream"
                  } ${answered ? "cursor-default" : "cursor-pointer"}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-black transition-colors ${
                      revealCorrect
                        ? "bg-mint text-white"
                        : revealWrong
                          ? "bg-cherry text-white"
                          : "bg-ink/8 text-ink"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  <span className="flex-1 text-sm leading-snug font-semibold md:text-base">{opt}</span>
                  {revealCorrect && <CheckCircle2 className="h-5 w-5 shrink-0 text-mint" />}
                  {revealWrong && <XCircle className="h-5 w-5 shrink-0 text-cherry" />}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* feedback toast */}
      <div className="mt-6 flex min-h-16 items-center justify-center">
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              key={`${index}-${feedback.ok}`}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`flex max-w-md items-center gap-3 rounded-full px-5 py-3 shadow-lg ${
                feedback.ok ? "bg-mint text-white" : "bg-cherry text-white"
              }`}
            >
              {feedback.ok ? (
                <CheckCircle2 className="h-5 w-5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 shrink-0" />
              )}
              <p className="text-sm leading-snug font-semibold">{feedback.msg}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* skip */}
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={skip}
          className="group flex items-center gap-2 text-xs font-bold tracking-wide text-ink/45 uppercase transition-colors hover:text-pink md:text-sm"
        >
          <Cake className="h-4 w-4" />
          Too cool for exams? Skip straight to the cake
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
