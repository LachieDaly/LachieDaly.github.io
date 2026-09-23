"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { BINGO_BOARDS } from "./boards";
import { storageKey } from "./[slug]/board-view";

function subscribeToStorage(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

/** Raw stored progress for every board, as one stable string snapshot. */
function getStorageSnapshot(): string {
  try {
    return JSON.stringify(
      BINGO_BOARDS.map((board) => localStorage.getItem(storageKey(board))),
    );
  } catch {
    return "[]";
  }
}

function countCompleted(raw: string | null): number {
  if (!raw) return 0;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? Object.keys(parsed).length : 0;
  } catch {
    return 0;
  }
}

export default function BingoPage() {
  // The server snapshot is empty, so counts render only once storage is read
  // on the client — the exported HTML and hydration never disagree.
  const rawSnapshot = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    () => "",
  );

  const counts = useMemo<Record<string, number> | null>(() => {
    if (rawSnapshot === "") return null;
    let stored: (string | null)[] = [];
    try {
      stored = JSON.parse(rawSnapshot);
    } catch {
      // Fall through to zero counts
    }
    return Object.fromEntries(
      BINGO_BOARDS.map((board, i) => [board.slug, countCompleted(stored[i] ?? null)]),
    );
  }, [rawSnapshot]);

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Bingo</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Reading and movie challenge bingo cards. Cross off prompts as you go —
          progress is saved in your browser.
        </p>
      </section>

      <section>
        <ul className="space-y-4">
          {BINGO_BOARDS.map((board) => {
            const total = board.size * board.size;
            const done = counts?.[board.slug];
            return (
              <li key={board.slug}>
                <Link
                  href={`/bingo/${board.slug}`}
                  className="group block px-5 py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-semibold text-lg">{board.title}</h2>
                    <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all text-sm">
                      Open →
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {board.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      {board.kind === "movie" ? "🎬 Movies" : "📚 Books"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                      {board.size} × {board.size}
                    </span>
                    {done !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          done === total
                            ? "border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                            : "border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {done === total ? "Complete! 🎉" : `${done} / ${total} ${board.kind === "movie" ? "watched" : "crossed off"}`}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
