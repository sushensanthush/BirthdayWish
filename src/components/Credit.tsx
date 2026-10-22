/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { Heart } from "lucide-react";
import { CREDIT } from "../credit";

/**
 * Attribution. Rendered on every screen and independent of the personalization
 * settings. Please keep it in place when you fork or redistribute this project.
 */

/** Small fixed badge, always visible in the corner */
export function CreditBadge() {
  return (
    <a
      href={CREDIT.github}
      target="_blank"
      rel="noopener noreferrer"
      data-credit="badge"
      aria-label={`${CREDIT.project} by ${CREDIT.author}`}
      className="fixed bottom-3 left-3 z-[70] flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/85 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-ink/60 shadow-sm backdrop-blur transition-colors hover:text-pink md:text-[11px]"
    >
      <Heart className="h-3 w-3 fill-pink text-pink" />
      <span className="uppercase">By {CREDIT.shortName}</span>
    </a>
  );
}

/** Full credit line at the bottom of every screen */
export function CreditFooter() {
  return (
    <footer
      data-credit="footer"
      className="relative z-10 px-4 pt-2 pb-20 text-center text-[11px] font-medium text-ink/50"
    >
      <p>
        {CREDIT.project} &copy; {CREDIT.year}{" "}
        <a
          href={CREDIT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-ink/70 underline decoration-pink/50 underline-offset-2 hover:text-pink"
        >
          {CREDIT.author}
        </a>
        {" "}&middot; {CREDIT.license} License &middot;{" "}
        <a
          href={CREDIT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-ink/20 underline-offset-2 hover:text-pink"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
