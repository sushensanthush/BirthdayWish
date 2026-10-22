/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */

/**
 * Personalization layer.
 *
 * Everything that is specific to one celebration (name, age, date, relationship)
 * is resolved here, once, and consumed by the rest of the app. Values come from,
 * in order of priority:
 *
 *   1. URL query parameters  e.g.  ?name=Maya&age=21&from=Daniel&date=03-14
 *   2. The DEFAULTS below    (edit these to hard-code your own deployment)
 *
 * All input is sanitized and length-limited before use.
 */

export const ROLES = ["brother", "sister", "cousin", "friend", "boyfriend", "girlfriend"] as const;
export type Role = (typeof ROLES)[number];

export const isRomanticRole = (r: Role) => r === "boyfriend" || r === "girlfriend";

/**
 * Keeps the two roles coherent: a romantic role is never paired with a family
 * or friend role. `lead` is the side that wins when only one of them is romantic.
 * Two romantic roles are always left as chosen.
 */
export function normalizeRoles(from: Role, to: Role, lead: "from" | "to" = "from"): [Role, Role] {
  const complement = (r: Role): Role => (r === "boyfriend" ? "girlfriend" : "boyfriend");
  const a = isRomanticRole(from);
  const b = isRomanticRole(to);
  if (a === b) return [from, to];
  if (lead === "from") return a ? [from, complement(from)] : [from, "friend"];
  return b ? [complement(to), to] : ["friend", to];
}

export interface AppConfig {
  /** Birthday person's name */
  name: string;
  /** The age they are turning */
  age: number;
  /** Sender's name, used for the letter signature and certificate (optional) */
  from: string;
  /** Who the sender is to the birthday person */
  fromRole: Role;
  /** Who the birthday person is to the sender */
  toRole: Role;
  /** Birthday month, 1-12 */
  month: number;
  /** Birthday day of month, 1-31 */
  day: number;
}

export const DEFAULTS: AppConfig = {
  name: "Alex",
  age: 20,
  from: "",
  fromRole: "brother",
  toRole: "sister",
  month: 10,
  day: 19,
};

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const NAME_MAX = 20;
export const FROM_MAX = 24;

function cleanText(value: string | null | undefined, max: number): string {
  if (!value) return "";
  return value
    .replace(/[^\p{L}\p{M}\s'.-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanAge(value: string | null | undefined, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n >= 1 && n <= 120 ? n : fallback;
}

function cleanRole(value: string | null | undefined, fallback: Role): Role {
  const v = (value ?? "").toLowerCase();
  return (ROLES as readonly string[]).includes(v) ? (v as Role) : fallback;
}

function cleanDate(value: string | null | undefined): { month: number; day: number } | null {
  const m = /^(\d{1,2})-(\d{1,2})$/.exec(value ?? "");
  if (!m) return null;
  const month = Number(m[1]);
  const day = Number(m[2]);
  // 2024 is a leap year, so 02-29 is accepted
  const probe = new Date(2024, month - 1, day);
  if (probe.getMonth() !== month - 1 || probe.getDate() !== day) return null;
  return { month, day };
}

export function resolveConfig(search: string): AppConfig {
  const q = new URLSearchParams(search);
  const date = cleanDate(q.get("date"));
  const [fromRole, toRole] = normalizeRoles(
    cleanRole(q.get("fromRole"), DEFAULTS.fromRole),
    cleanRole(q.get("toRole"), DEFAULTS.toRole)
  );
  return {
    name: cleanText(q.get("name"), NAME_MAX) || DEFAULTS.name,
    age: cleanAge(q.get("age"), DEFAULTS.age),
    from: q.has("from") ? cleanText(q.get("from"), FROM_MAX) : DEFAULTS.from,
    fromRole,
    toRole,
    month: date?.month ?? DEFAULTS.month,
    day: date?.day ?? DEFAULTS.day,
  };
}

export function buildQuery(cfg: AppConfig): string {
  const q = new URLSearchParams();
  q.set("name", cfg.name);
  q.set("age", String(cfg.age));
  if (cfg.from) q.set("from", cfg.from);
  q.set("fromRole", cfg.fromRole);
  q.set("toRole", cfg.toRole);
  q.set("date", `${String(cfg.month).padStart(2, "0")}-${String(cfg.day).padStart(2, "0")}`);
  return q.toString();
}

export const CONFIG: AppConfig = resolveConfig(
  typeof window !== "undefined" ? window.location.search : ""
);

/* ---------- derived helpers used across the UI ---------- */

export function ordinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const isSiblingRole = (r: Role) => r === "brother" || r === "sister";

export const T = {
  name: CONFIG.name,
  NAME: CONFIG.name.toUpperCase(),
  age: CONFIG.age,
  ageOrdinal: ordinal(CONFIG.age),
  from: CONFIG.from,
  fromRole: CONFIG.fromRole,
  toRole: CONFIG.toRole,
  FromRole: cap(CONFIG.fromRole),
  /** "big brother" for siblings, plain role otherwise */
  bigFromRole: isSiblingRole(CONFIG.fromRole) ? `big ${CONFIG.fromRole}` : CONFIG.fromRole,
  /** true when both people are siblings, which unlocks the family-flavoured jokes */
  siblings: isSiblingRole(CONFIG.fromRole) && isSiblingRole(CONFIG.toRole),
  isAdult: CONFIG.age >= 18,
  monthName: MONTH_NAMES[CONFIG.month - 1],
  monthShort: MONTH_NAMES[CONFIG.month - 1].slice(0, 3),
  day: CONFIG.day,
  /** "favorite sibling" / "favorite person" */
  favoriteNoun: isSiblingRole(CONFIG.fromRole) ? "sibling" : "person",
  /** true when this is a boyfriend / girlfriend celebration */
  romantic: isRomanticRole(CONFIG.fromRole) && isRomanticRole(CONFIG.toRole),
  /** "brotherly training", "friendly training", "boyfriend training" */
  fromTraining:
    CONFIG.fromRole === "friend"
      ? "friendly training"
      : isRomanticRole(CONFIG.fromRole)
        ? `${CONFIG.fromRole} training`
        : `${CONFIG.fromRole}ly training`,
  /** Closing line of the finale footer */
  bestDay:
    isSiblingRole(CONFIG.fromRole) || CONFIG.fromRole === "cousin"
      ? "The best day in family history"
      : "The best day of the year",
};
