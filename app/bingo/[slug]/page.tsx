import { notFound } from "next/navigation";
import { BINGO_BOARDS, getBoard } from "../boards";
import BoardView from "./board-view";

// In the App Router (Next 15+), params is a Promise and must be awaited
interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Tell Next.js which board slugs to pre-render at build time.
 * Required for dynamic routes when using `output: "export"`.
 */
export function generateStaticParams() {
  return BINGO_BOARDS.map((board) => ({ slug: board.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const board = getBoard(slug);
  if (!board) return {};
  return {
    title: board.title,
    description: board.description,
  };
}

export default async function BingoBoardPage({ params }: Props) {
  const { slug } = await params;
  const board = getBoard(slug);
  if (!board) notFound();

  // Catch a malformed board at build time rather than rendering a broken grid
  if (board.prompts.length !== board.size * board.size) {
    throw new Error(
      `Bingo board "${board.slug}" has ${board.prompts.length} prompts but needs ${
        board.size * board.size
      } (${board.size} × ${board.size})`,
    );
  }

  return <BoardView board={board} />;
}
