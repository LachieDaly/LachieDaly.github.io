"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { BingoBoard } from "../boards";

/** One completed cell: presence in the record means "crossed off". */
interface CellProgress {
  /** The book read for this prompt, if recorded */
  book?: string;
}

type BoardProgress = Record<number, CellProgress>;

export function storageKey(slug: string) {
  return `book-bingo:${slug}`;
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

function useBoardProgress(slug: string) {
  const key = storageKey(slug);

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
  const { progress, write } = useBoardProgress(board.slug);
  const [selected, setSelected] = useState<number | null>(null);
  const [draftBook, setDraftBook] = useState("");

  const total = board.size * board.size;
  const completedCount = Object.keys(progress).length;
  const lines = countLines(progress, board.size);

  const selectCell = (index: number) => {
    if (selected === index) {
      setSelected(null);
      return;
    }
    setSelected(index);
    setDraftBook(progress[index]?.book ?? "");
  };

  const markDone = () => {
    if (selected === null) return;
    const book = draftBook.trim();
    write({ ...progress, [selected]: book ? { book } : {} });
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
            className="h-full rounded-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${(completedCount / total) * 100}%` }}
          />
        </div>
        <span className="text-sm text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
          {completedCount} / {total}
          {lines > 0 && (
            <span className="ml-2 text-emerald-600 dark:text-emerald-400 font-medium">
              {lines} bingo{lines === 1 ? "" : "s"}!
            </span>
          )}
        </span>
      </div>

      {/* The card */}
      <div
        role="grid"
        className="grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${board.size}, minmax(0, 1fr))` }}
      >
        {board.prompts.map((prompt, index) => {
          const cell = progress[index];
          const done = cell !== undefined;
          const isSelected = selected === index;
          return (
            <button
              key={index}
              type="button"
              onClick={() => selectCell(index)}
              aria-pressed={done}
              title={done && cell.book ? `${prompt} — ${cell.book}` : prompt}
              className={`relative aspect-square rounded-lg border p-1 sm:p-1.5 flex flex-col items-center justify-center text-center transition-all ${
                done
                  ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-slate-400 dark:text-slate-500"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
              } ${isSelected ? "ring-2 ring-blue-500 border-transparent" : ""}`}
            >
              <span
                className={`text-[10px] sm:text-xs leading-tight break-words ${
                  done ? "line-through" : ""
                }`}
              >
                {prompt}
              </span>
              {done && cell.book && (
                <span className="hidden sm:block text-[9px] italic text-emerald-700 dark:text-emerald-400 leading-tight mt-0.5 line-clamp-2 no-underline">
                  {cell.book}
                </span>
              )}
              {done && (
                <span
                  aria-hidden
                  className="absolute top-0.5 right-1 text-emerald-500 text-xs"
                >
                  ✓
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
              Which book did you read? (optional, for checking purposes)
            </span>
            <input
              type="text"
              value={draftBook}
              onChange={(e) => setDraftBook(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") markDone();
              }}
              placeholder="Book title"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={markDone}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
            >
              {selected in progress ? "Save" : "Cross it off"}
            </button>
            {selected in progress && (
              <button
                type="button"
                onClick={unmark}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-sm transition-colors"
              >
                Un-cross
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
