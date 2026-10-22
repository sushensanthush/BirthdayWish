/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, ExternalLink, Gift, X } from "lucide-react";
import {
  CONFIG,
  FROM_MAX,
  MONTH_NAMES,
  NAME_MAX,
  ROLES,
  buildQuery,
  cap,
  normalizeRoles,
  type Role,
  resolveConfig,
} from "../config";

/** Floating button + dialog that lets anyone build a personalized link */
export default function Personalize() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(CONFIG.name);
  const [age, setAge] = useState(String(CONFIG.age));
  const [from, setFrom] = useState(CONFIG.from);
  const [fromRole, setFromRole] = useState<string>(CONFIG.fromRole);
  const [toRole, setToRole] = useState<string>(CONFIG.toRole);
  const [month, setMonth] = useState(CONFIG.month);
  const [day, setDay] = useState(CONFIG.day);
  const firstField = useRef<HTMLInputElement>(null);

  // 2024 is a leap year, so February offers 29 days
  const maxDay = new Date(2024, month, 0).getDate();
  const safeDay = Math.min(day, maxDay);

  // Build and sanitize the query exactly the way the app will read it back
  const query = useMemo(() => {
    const raw = new URLSearchParams();
    raw.set("name", name);
    raw.set("age", age);
    raw.set("from", from);
    raw.set("fromRole", fromRole);
    raw.set("toRole", toRole);
    raw.set("date", `${month}-${safeDay}`);
    return buildQuery(resolveConfig(`?${raw.toString()}`));
  }, [name, age, from, fromRole, toRole, month, safeDay]);

  const link = `${window.location.origin}${window.location.pathname}?${query}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    firstField.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const changeFromRole = (value: Role) => {
    const [f, t] = normalizeRoles(value, toRole as Role, "from");
    setFromRole(f);
    setToRole(t);
  };
  const changeToRole = (value: Role) => {
    const [f, t] = normalizeRoles(fromRole as Role, value, "to");
    setFromRole(f);
    setToRole(t);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", link);
    }
  };

  const field =
    "mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-white px-3.5 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-pink";
  const label = "block text-[11px] font-bold tracking-[0.18em] text-ink/60 uppercase";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid="personalize-open"
        className="fixed right-3 bottom-3 z-[70] flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-cream shadow-lg transition-transform hover:scale-105 md:text-sm"
      >
        <Gift className="h-4 w-4 text-sun" />
        Make it yours
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-end justify-center bg-ink/50 p-3 backdrop-blur-sm sm:items-center"
            onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="personalize-title"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[1.75rem] border-2 border-ink/10 bg-cream p-6 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="personalize-title" className="font-display text-2xl font-black">
                    Make it yours
                  </h2>
                  <p className="mt-1 text-sm font-medium text-ink/60">
                    Enter the details, then open the result or share the link.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-full p-1.5 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <label className="col-span-2">
                  <span className={label}>Birthday name</span>
                  <input
                    ref={firstField}
                    className={field}
                    value={name}
                    maxLength={NAME_MAX}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya"
                  />
                </label>
                <label>
                  <span className={label}>Turning</span>
                  <input
                    className={field}
                    type="number"
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>

                <div className="col-span-3 grid grid-cols-3 gap-3">
                  <label className="col-span-2">
                    <span className={label}>Birthday month</span>
                    <select className={field} value={month} onChange={(e) => setMonth(Number(e.target.value))}>
                      {MONTH_NAMES.map((m, i) => (
                        <option key={m} value={i + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className={label}>Day</span>
                    <select className={field} value={safeDay} onChange={(e) => setDay(Number(e.target.value))}>
                      {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="col-span-3">
                  <span className={label}>Your name (signature, optional)</span>
                  <input
                    className={field}
                    value={from}
                    maxLength={FROM_MAX}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="e.g. Daniel"
                  />
                </label>

                <div className="col-span-3 grid grid-cols-2 gap-3">
                <label>
                  <span className={label}>I am their</span>
                  <select className={field} value={fromRole} onChange={(e) => changeFromRole(e.target.value as Role)}>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {cap(r)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={label}>They are my</span>
                  <select className={field} value={toRole} onChange={(e) => changeToRole(e.target.value as Role)}>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {cap(r)}
                      </option>
                    ))}
                  </select>
                </label>
                </div>
              </div>

              <p className="mt-5 rounded-xl bg-white px-3.5 py-2.5 text-[11px] leading-snug font-medium break-all text-ink/50">
                {link}
              </p>

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={copy}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-pink px-5 py-3 text-sm font-bold text-white shadow-[0_6px_0_rgba(230,57,86,0.35)] transition-transform active:translate-y-0.5"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy share link"}
                </button>
                <a
                  href={link}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink/20 bg-white px-5 py-3 text-sm font-bold text-ink/80 transition-colors hover:border-ink"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open preview
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
