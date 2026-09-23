"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { BingoBoard, BingoKind } from "../boards";

/** One completed cell: presence in the record means "crossed off". */
interface CellProgress {
  /** The book read for this prompt, if recorded (book boards) */
  book?: string;
  /** The film watched for this prompt, if recorded (movie boards) */
  film?: string;
  /** 1–5 stars (movie boards) */
  rating?: number;
}

type BoardProgress = Record<number, CellProgress>;

/** Per-kind copy, colours, and features. Tailwind classes must be literal strings. */
const KINDS = {
  book: {
    field: "book",
    question: "Which book did you read? (optional, for checking purposes)",
    placeholder: "Book title",
    markLabel: "Cross it off",
    unmarkLabel: "Un-cross",
    badge: "✓",
    ratings: false,
    picker: false,
    bar: "bg-emerald-500",
    lineText: "text-emerald-600 dark:text-emerald-400",
    doneCell:
      "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-slate-400 dark:text-slate-500",
    doneStrike: "line-through",
    entryText: "text-emerald-700 dark:text-emerald-400",
    badgeText: "text-emerald-500",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
  movie: {
    field: "film",
    question: "Which film did you watch?",
    placeholder: "Film title",
    markLabel: "Mark as watched",
    unmarkLabel: "Unwatch",
    badge: "🎬",
    ratings: true,
    picker: true,
    bar: "bg-amber-500",
    lineText: "text-amber-600 dark:text-amber-400",
    doneCell:
      "border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-slate-500 dark:text-slate-400",
    doneStrike: "",
    entryText: "text-amber-700 dark:text-amber-400 font-medium",
    badgeText: "",
    button: "bg-amber-600 hover:bg-amber-700",
  },
} as const satisfies Record<BingoKind, unknown>;

export function storageKey(board: Pick<BingoBoard, "kind" | "slug">) {
  return `${board.kind}-bingo:${board.slug}`;
}

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} className={className}>
      {"★".repeat(rating)}
      <span className="opacity-30">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

/**
 * Progress lives in localStorage, read via useSyncExternalStore so the
 * server-rendered HTML (no storage) and the client stay consistent —
 * same pattern as the Overlap game.
 */
const storageListeners = new Set<() => void>();

function subscribeToProgress(cb: () => void) {
  storageListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    storageListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function parseProgress(raw: string): BoardProgress {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as BoardProgress;
    }
  } catch {
    // Corrupt data — start fresh
  }
  return {};
}

function useBoardProgress(board: BingoBoard) {
  const key = storageKey(board);

  const getSnapshot = useCallback(() => {
    try {
      return localStorage.getItem(key) ?? "{}";
    } catch {
      return "{}";
    }
  }, [key]);

  const raw = useSyncExternalStore(
    subscribeToProgress,
    getSnapshot,
    () => "{}",
  );
  const progress = useMemo(() => parseProgress(raw), [raw]);

  const write = useCallback(
    (next: BoardProgress) => {
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Private browsing or storage full — progress just isn't persisted
      }
      storageListeners.forEach((l) => l());
    },
    [key],
  );

  return { progress, write };
}

/** Count completed rows, columns, and diagonals on a size × size board. */
function countLines(progress: BoardProgress, size: number): number {
  const done = (index: number) => index in progress;
  let lines = 0;

  for (let r = 0; r < size; r++) {
    if (Array.from({ length: size }, (_, c) => r * size + c).every(done)) lines++;
  }
  for (let c = 0; c < size; c++) {
    if (Array.from({ length: size }, (_, r) => r * size + c).every(done)) lines++;
  }
  if (Array.from({ length: size }, (_, i) => i * size + i).every(done)) lines++;
  if (Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)).every(done)) lines++;

  return lines;
}

export default function BoardView({ board }: { board: BingoBoard }) {
  const kind = KINDS[board.kind];
  const { progress, write } = useBoardProgress(board);
  const [selected, setSelected] = useState<number | null>(null);
  const [draftEntry, setDraftEntry] = useState("");
  const [draftRating, setDraftRating] = useState(0);

  const total = board.size * board.size;
  const completedCount = Object.keys(progress).length;
  const lines = countLines(progress, board.size);

  const ratings = Object.values(progress)
    .map((cell) => cell.rating)
    .filter((r): r is number => typeof r === "number" && r > 0);
  const averageRating =
    ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;

  const openCell = (index: number) => {
    setSelected(index);
    setDraftEntry(progress[index]?.[kind.field] ?? "");
    setDraftRating(progress[index]?.rating ?? 0);
  };

  const selectCell = (index: number) => {
    if (selected === index) {
      setSelected(null);
      return;
    }
    openCell(index);
  };

  /** Open a random prompt that hasn't been done yet. */
  const pickForMe = () => {
    const remaining = board.prompts
      .map((_, i) => i)
      .filter((i) => !(i in progress) && i !== selected);
    if (remaining.length === 0) return;
    openCell(remaining[Math.floor(Math.random() * remaining.length)]);
  };

  const markDone = () => {
    if (selected === null) return;
    const entry = draftEntry.trim();
    const cell: CellProgress = {};
    if (entry) cell[kind.field] = entry;
    if (kind.ratings && draftRating > 0) cell.rating = draftRating;
    write({ ...progress, [selected]: cell });
    setSelected(null);
  };

  const unmark = () => {
    if (selected === null) return;
    const next = { ...progress };
    delete next[selected];
    write(next);
    setSelected(null);
  };

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{board.title}</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {board.description}
        </p>
      </header>

      {/* Progress summary */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full rounded-full ${kind.bar} transition-all duration-500`}
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
          {completedCount} / {total}
          {lines > 0 && (
            <span className={`ml-2 ${kind.lineText} font-medium`}>
              {lines} bingo{lines === 1 ? "" : "s"}!
            </span>
          )}
        </span>
      </div>

      {(kind.picker || averageRating !== null) && (
        <div className="flex flex-wrap items-center justify-between gap-3 -mt-4">
          {averageRating !== null ? (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Average rating{" "}
              <span className="text-amber-500">{averageRating.toFixed(1)} ★</span>{" "}
              across {ratings.length} film{ratings.length === 1 ? "" : "s"}
            </span>
          ) : (
            <span />
          )}
          {kind.picker && completedCount < total && (
            <button
              type="button"
              onClick={pickForMe}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm transition-colors"
            >
              🎲 Pick for me
            </button>
          )}
        </div>
      )}

      {/* The card */}
      <div
        role="grid"
        className="grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
      >
        {board.prompts.map((prompt, index) => {
          const cell = progress[index];
          const done = cell !== undefined;
          const entry = cell?.[kind.field];
          const isSelected = selected === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => selectCell(index)}
              aria-pressed={done}
              title={entry ? `${prompt} — ${entry}` : prompt}
              className={`relative aspect-square rounded-lg border p-1 sm:p-1.5 flex flex-col items-center justify-center text-center transition-all ${
                done
                  ? kind.doneCell
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
              } ${isSelected ? "ring-2 ring-blue-500 border-transparent" : ""}`}
            >
              <span
                className={`text-[10px] sm:text-xs leading-tight break-words ${
                  done ? kind.doneStrike : ""
                }`}
              >
                {prompt}
              </span>
              {entry && (
                <span
                  className={`hidden sm:block text-[9px] italic ${kind.entryText} leading-tight mt-0.5 line-clamp-2 no-underline`}
                >
                  {entry}
                </span>
              )}
              {done && cell.rating && (
                <Stars rating={cell.rating} className="text-amber-500 text-[9px] sm:text-[10px] mt-0.5" />
              )}
              {done && (
                <span
                  aria-hidden
                  className={`absolute top-0.5 right-1 ${kind.badgeText} text-xs`}
                >
                  {kind.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cell detail panel */}
      {selected !== null && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-semibold">{board.prompts[selected]}</h2>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              ✕
            </button>
          </div>
          <label className="block space-y-1.5">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {kind.question}
            </span>
            <input
              type="text"
              value={draftEntry}
              onChange={(e) => setDraftEntry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") markDone();
              }}
              placeholder={kind.placeholder}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </label>
          {kind.ratings && (
            <div className="space-y-1.5">
              <span className="block text-sm text-slate-500 dark:text-slate-400">
                Your rating
              </span>
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-checked={draftRating === star}
                    aria-label={`${star} star${star === 1 ? "" : "s"}`}
                    // Clicking the current rating again clears it
                    onClick={() => setDraftRating(draftRating === star ? 0 : star)}
                    className={`text-2xl leading-none transition-colors ${
                      star <= draftRating
                        ? "text-amber-500"
                        : "text-slate-300 dark:text-slate-700 hover:text-amber-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={markDone}
              className={`px-4 py-2 rounded-lg ${kind.button} text-white text-sm font-medium transition-colors`}
            >
              {selected in progress ? "Save" : kind.markLabel}
            </button>
            {selected in progress && (
              <button
                type="button"
                onClick={unmark}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm transition-colors"
              >
                {kind.unmarkLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Rules */}
      {board.rules && board.rules.length > 0 && (
        <section className="text-sm text-slate-500 dark:text-slate-400">
          <h2 className="font-medium text-slate-700 dark:text-slate-300 mb-2">
            The rules
          </h2>
          <ul className="list-disc list-inside space-y-1">
            {board.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      )}

      <footer className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/bingo"
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          ← All bingo cards
        </Link>
      </footer>
    </div>
  );
}
