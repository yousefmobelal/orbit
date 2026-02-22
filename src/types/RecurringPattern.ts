export const RECURRING_PATTERNS = [
  "none",
  "daily",
  "weekly",
  "monthly",
] as const;
export type RecurringPattern = (typeof RECURRING_PATTERNS)[number];
