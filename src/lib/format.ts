export const STATUS_LABEL = { active: 'Active', done: 'Done', paused: 'Paused' } as const;

/** "2026-09" -> "2026.09" */
const dot = (ym: string) => ym.replace('-', '.');

/** Period shown in project tables: "2026.09 –", "2026.03 – 2026.06", or "–" when unknown. */
export function period(start?: string, end?: string): string {
  if (!start) return '–';
  return end ? `${dot(start)} – ${dot(end)}` : `${dot(start)} –`;
}

/** Date -> "2026-11-10" (UTC, matches the date written in front matter). */
export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
