/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { T } from "../config";

export interface Question {
  question: string;
  tag: string;
  options: string[];
  /** indices of accepted answers; empty means every answer is accepted (joke round) */
  correct: number[];
  correctMsg: string;
  wrongMsg: string;
}

export const QUESTIONS: Question[] = [
  {
    question: "Let's start easy. You are turning...",
    tag: "Warm-up round",
    options: [
      `${T.age} — but 05 yo when cartoons are on`,
      T.isAdult ? `${T.age}, an adult, apparently` : `${T.age}, and growing up way too fast`,
      `${T.age - 1} — denial is a beautiful thing`,
      "Infinity — age is just a number",
    ],
    correct: [0],
    correctMsg: "Correct! Nothing beats good old cartoons and good food.",
    wrongMsg: `Wrong! You're ${T.age} now. There is no escape. Time marches on.`,
  },
  {
    question: `Who is your favorite ${T.favoriteNoun}?`,
    tag: "Honesty check",
    options: [
      `My ${T.fromRole}`,
      `My ${T.fromRole}, duh`,
      "The one who built this entire website for me",
      "All of the above",
    ],
    correct: [],
    correctMsg: "Correct! Every answer was acceptable. Great job. Full marks.",
    wrongMsg: "Incorrect. Wait — how? All answers were correct. Impressive, actually.",
  },
  {
    question: "Your one true superpower is...",
    tag: "Talent round",
    options: [
      "Eating everyone's leftovers at record speed",
      "'Getting ready in 5 minutes' (2 hours later)",
      "Sleep All Day, Every Day",
      "Winning any argument with a single look",
    ],
    correct: [3],
    correctMsg: "Correct! A certified triple threat. The Avengers could never.",
    wrongMsg: "Wrong! Your superpower is You're a fighter. Know your worth.",
  },
  {
    question: "When you say 'I'm not angry', you mean...",
    tag: "Survival round",
    options: [
      "I am completely, totally fine",
      "I need food. Immediately.",
      "RUN. Run far. Run fast. I'm gonna kill you.",
      "Bring chocolate and apologize anyway",
    ],
    correct: [2],
    correctMsg: "Correct! We have all learned to run. Knowledge is survival.",
    wrongMsg: "Wrong! The correct answer was RUN. You've doomed us all.",
  },
  {
    question: "Your Energy Level hits 1%. You...",
    tag: "Crisis management",
    options: [
      "Cry in the corner and hope for the best.",
      `Check up on your ${T.fromRole} to see if they’re online, so you can confess and get a hug.`,
      "Sing a song about your feelings.",
      "Booty shake your way to the nearest exit.",
    ],
    correct: [1],
    correctMsg: "Correct! At 1% energy, a confession and a hug are essential survival tools.",
    wrongMsg: `Wrong! When your energy hits 1%, your ${T.fromRole} and a hug are your emergency backup plan.`,
  },
  {
    question: "The fastest way to your heart is...",
    tag: "Soft round",
    options: [
      "Good food",
      "Surprises and gifts",
      "Sleeping in until noon",
      `Your ${T.fromRole}'s amazing jokes and Hugs`,
    ],
    correct: [],
    correctMsg: "Correct! (It's technically all of them, but the jokes helped.)",
    wrongMsg: `Hmm, technically correct. But the jokes, ${T.name}. THE JOKES And HUGS.`,
  },
  {
    question: `Finally — rate your ${T.fromRole}.`,
    tag: "Bonus round",
    options: [
      "10 / 10",
      "10 / 10",
      "10 / 10",
      "10 / 10 — the scale only goes to 10",
    ],
    correct: [],
    correctMsg: "Correct! And so humble, too. Cake unlocked.",
    wrongMsg: "Incorrect. Just kidding — every answer was right. Full marks.",
  },
];

export function getResult(score: number) {
  if (score >= 7)
    return {
      title: "Certified Birthday Queen",
      sub: `A perfect score. You know yourself almost as well as your ${T.fromRole} does.`,
      icon: "crown" as const,
    };
  if (score >= 5)
    return {
      title: "Close Enough - Cake Unlocked",
      sub: `Strong showing. A few more years of ${T.fromTraining} and you'll be perfect.`,
      icon: "trophy" as const,
    };
  if (score >= 3)
    return {
      title: "Suspicious - Extra Cake Required",
      sub: "The committee has concerns, but the cake will be provided anyway.",
      icon: "alert" as const,
    };
  return {
    title: "Failed - Cake Mandatory Regardless",
    sub: "You got almost everything wrong, but it's your birthday. You win by default.",
    icon: "heart" as const,
  };
}
