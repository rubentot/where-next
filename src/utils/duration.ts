/** Parse a duration string like "2 years", "12 months", "1.5 years" into months. */
export function parseDurationMonths(duration: string): number {
  const monthMatch = duration.match(/(\d+(?:\.\d+)?)\s*months?/i);
  if (monthMatch) return Math.round(parseFloat(monthMatch[1]));

  const yearMatch = duration.match(/(\d+(?:\.\d+)?)\s*years?/i);
  if (yearMatch) return Math.round(parseFloat(yearMatch[1]) * 12);

  return 24; // fallback: standard 2-year master's
}
