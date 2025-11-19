/**
 * Glitch Militia Lore Intercepts
 * Cryptic intercepted signals that appear on relevant department pages
 * Performance-optimized: signals stored in JSON file
 */

import glitchSignalsData from '../data/glitchSignals.json';

export interface GlitchSignal {
  dept: string[]; // Array of department slugs this signal is relevant to
  text: string; // The cryptic message
}

export const glitchSignals: GlitchSignal[] = glitchSignalsData as GlitchSignal[];

/**
 * Get glitch signals relevant to a department
 * @param departmentSlug - Department slug to check
 * @returns Array of relevant glitch signals
 */
export function getGlitchSignalsForDepartment(departmentSlug: string): GlitchSignal[] {
  return glitchSignals.filter(signal => signal.dept.includes(departmentSlug));
}

/**
 * Get a random glitch signal for a department
 * @param departmentSlug - Department slug
 * @returns Random glitch signal or null
 */
export function getRandomGlitchSignal(departmentSlug: string): GlitchSignal | null {
  const relevant = getGlitchSignalsForDepartment(departmentSlug);
  if (relevant.length === 0) return null;
  return relevant[Math.floor(Math.random() * relevant.length)];
}

