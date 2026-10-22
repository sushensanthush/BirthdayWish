/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import confetti from "canvas-confetti";

export const CONFETTI_COLORS = ["#ff5d8f", "#ffa45b", "#b78ce8", "#4ed4b5", "#ffd166", "#33202e"];

const base = {
  colors: CONFETTI_COLORS,
  disableForReducedMotion: true,
  zIndex: 80,
};

/** Small celebratory pop */
export function pop(x = 0.5, y = 0.6) {
  confetti({
    ...base,
    particleCount: 55,
    spread: 65,
    startVelocity: 32,
    scalar: 0.9,
    origin: { x, y },
  });
}

/** Medium burst for correct answers */
export function correctBurst() {
  confetti({
    ...base,
    particleCount: 45,
    spread: 60,
    startVelocity: 28,
    scalar: 0.75,
    ticks: 140,
    origin: { y: 0.65 },
  });
}

/** Big show for results / finale */
export function grandFinale() {
  confetti({ ...base, particleCount: 140, spread: 100, origin: { y: 0.6 } });

  const shot = (delay: number) =>
    window.setTimeout(() => {
      confetti({ ...base, particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } });
      confetti({ ...base, particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } });
    }, delay);

  shot(250);
  shot(650);
  shot(1100);
}

/** Continuous gentle rain for a few seconds — used when all candles go out */
export function wishGranted() {
  const end = Date.now() + 1800;
  const frame = () => {
    confetti({ ...base, particleCount: 4, spread: 75, startVelocity: 22, scalar: 0.85, origin: { x: Math.random(), y: -0.05 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
