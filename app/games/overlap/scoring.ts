/**
 * Category difficulty and scoring, shared by Overlap and Overlap Hard.
 *
 * Like Connections, every puzzle has one category at each difficulty, from
 * 1 (yellow, the most straightforward) to 4 (purple, the trickiest).
 *
 * A solved category scores its base points times a multiplier for how early it
 * was solved (×4 for the first group, down to ×1 for the last). Pairing the
 * biggest base with the biggest multiplier maximises the total, so solving
 * hardest → easiest earns the most (300) and easiest → hardest the least (200).
 */

export type Difficulty = 1 | 2 | 3 | 4;

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: 'Yellow',
  2: 'Green',
  3: 'Blue',
  4: 'Purple',
};

export const BASE_POINTS: Record<Difficulty, number> = { 1: 10, 2: 20, 3: 30, 4: 40 };
const CATEGORY_COUNT = 4;

/** Multiplier for the category solved in position `order` (0 = first). */
export function orderMultiplier(order: number): number {
  return CATEGORY_COUNT - order;
}

export function categoryPoints(difficulty: Difficulty, order: number): number {
  return BASE_POINTS[difficulty] * orderMultiplier(order);
}

/** Total score for categories solved in the given order of difficulties. */
export function totalScore(solvedDifficulties: Difficulty[]): number {
  return solvedDifficulties.reduce((sum, d, order) => sum + categoryPoints(d, order), 0);
}

export const MAX_SCORE = totalScore([4, 3, 2, 1]);

/**
 * One colour per difficulty (index = difficulty − 1).
 * `chip` styles the solved-category pills; `tile` is a translucent colour that
 * reads well on both light and dark tile backgrounds, so tiles can blend
 * multiple category colours with a gradient when a word sits in several
 * solved categories. `dot` is a solid swatch for legends.
 */
export const DIFFICULTY_COLORS = [
  {
    chip: 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200',
    tile: 'rgba(245, 158, 11, 0.35)',
    dot: 'bg-amber-400',
  },
  {
    chip: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200',
    tile: 'rgba(16, 185, 129, 0.35)',
    dot: 'bg-emerald-500',
  },
  {
    chip: 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200',
    tile: 'rgba(59, 130, 246, 0.35)',
    dot: 'bg-blue-500',
  },
  {
    chip: 'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200',
    tile: 'rgba(168, 85, 247, 0.35)',
    dot: 'bg-purple-500',
  },
] as const;

export function difficultyColor(difficulty: Difficulty) {
  return DIFFICULTY_COLORS[difficulty - 1];
}

/** Blend the colours of one or more solved categories into a tile background. */
export function tileBackground(difficulties: Difficulty[]): string {
  if (difficulties.length === 1) return difficultyColor(difficulties[0]).tile;
  const stops = difficulties.map((d, i) => {
    const from = (i / difficulties.length) * 100;
    const to = ((i + 1) / difficulties.length) * 100;
    return `${difficultyColor(d).tile} ${from}% ${to}%`;
  });
  return `linear-gradient(135deg, ${stops.join(', ')})`;
}
