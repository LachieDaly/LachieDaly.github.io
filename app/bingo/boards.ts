export interface BingoBoard {
  /** Used in the URL (/bingo/[slug]) and as the localStorage key */
  slug: string;
  title: string;
  description: string;
  /** The card is a size × size grid */
  size: number;
  /** Cell prompts in row-major order; must contain exactly size * size entries */
  prompts: string[];
  /** Optional rules shown under the card */
  rules?: string[];
}

/**
 * To add a new bingo card, append an entry here with a unique slug, a size,
 * and size × size prompts — the list page, board page, and progress tracking
 * all pick it up automatically.
 */
export const BINGO_BOARDS: BingoBoard[] = [
  {
    slug: "spring-summer-2026",
    title: "Spring/Summer Reading List",
    description:
      "Book bingo: 25 prompts, one book each. Cross them off as you read.",
    size: 5,
    prompts: [
      "Been on your list for a while",
      "One-word title",
      "Set at the beach",
      "Has a movie adaptation",
      "From your childhood",
      "Released in 2026",
      "Recommended to you",
      "Magic in it",
      "Non-fiction",
      "Favourite colour cover",
      "Solves a mystery",
      "Classic",
      "FREE CHOICE",
      "Best-seller",
      "Author with your first name",
      "Female main character",
      "Nature on the cover",
      "Involves sport",
      "Released in your birth year",
      "Set in Australia",
      "Picked by another player",
      "About a family",
      "Romance",
      "Out of this world",
      "Animal main character",
    ],
    rules: [
      "One book per prompt — 25 books",
      "Share recommendations with your team",
      "Keep track (for checking purposes)",
      "Bonus points for watching the movie adaptation",
    ],
  },
];

export function getBoard(slug: string): BingoBoard | undefined {
  return BINGO_BOARDS.find((board) => board.slug === slug);
}
