/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./components/Backdrop";
import Hero from "./components/Hero";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import Finale from "./components/Finale";
import { QUESTIONS } from "./data/quiz";
import { CreditBadge, CreditFooter } from "./components/Credit";
import Personalize from "./components/Personalize";
import { T } from "./config";

type Screen = "hero" | "quiz" | "results" | "finale";

const screenTransition = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("hero");
  const [score, setScore] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [screen]);

  // Keep the tab title and link-preview description in sync with the personalization
  useEffect(() => {
    document.title = `Happy ${T.ageOrdinal} Birthday, ${T.name}!`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        `A very serious birthday exam for ${T.name}, who is turning ${T.age}. Made with love by their ${T.fromRole}.`
      );
  }, []);

  return (
    <div className="grain relative min-h-screen bg-cream font-body text-ink">
      <Backdrop />

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={screenTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {screen === "hero" && <Hero onStart={() => setScreen("quiz")} />}

          {screen === "quiz" && (
            <Quiz
              onFinish={(s) => {
                setScore(s);
                setScreen("results");
              }}
              onSkip={() => setScreen("finale")}
            />
          )}

          {screen === "results" && (
            <Results
              score={score}
              total={QUESTIONS.length}
              onContinue={() => setScreen("finale")}
              onRetry={() => setScreen("quiz")}
            />
          )}

          {screen === "finale" && <Finale />}
        </motion.div>
      </AnimatePresence>

      <CreditFooter />
      <CreditBadge />
      <Personalize />
    </div>
  );
}
