export type BingoKind = "book" | "movie";

export interface BingoBoard {
  /** Used in the URL (/bingo/[slug]) and as the localStorage key */
  slug: string;
  /** What gets logged against each prompt — drives copy, colours, and extras */
  kind: BingoKind;
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
    kind: "book",
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
  {
    slug: "movie-marathon-2026",
    kind: "movie",
    title: "Summer Movie Marathon",
    description:
      "Movie bingo: 25 prompts on a 5 × 5 card. Log each film and give it a star rating.",
    size: 5,
    prompts: [
      "Won Best Picture",
      "Not in English",
      "Released before you were born",
      "Under 90 minutes",
      "Directed by a woman",
      "Animated",
      "Watched at the cinema",
      "Based on a true story",
      "Set in space",
      "A musical",
      "Over 2½ hours long",
      "Scared you",
      "Australian made",
      "A parent's favourite",
      "Black and white",
      "Rewatch of a childhood favourite",
      // Added when the card grew to 5 × 5. New prompts go on the end so saved
      // progress (keyed by prompt index) still points at the same prompts.
      "Released in 2026",
      "A sequel",
      "Documentary",
      "Made you cry",
      "Set in summer",
      "Number in the title",
      "A heist",
      "Picked by someone else",
      "Iconic soundtrack",
    ],
    rules: [
      "One film per prompt — no double-dipping",
      "Must be watched this summer, start to finish",
      "Stuck? Hit “Pick for me” and let fate decide",
      "Bonus points if you read the book first",
    ],
  },
];

export function getBoard(slug: string): BingoBoard | undefined {
  return BINGO_BOARDS.find((board) => board.slug === slug);
}
