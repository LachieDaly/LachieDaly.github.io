'use client';

import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { PUZZLES, type OverlapPuzzle } from './puzzles';

const MAX_MISTAKES = 4;
const STORAGE_KEY = 'overlap-completed-v1';

// One colour per category, assigned by solve order
const SOLVED_STYLES = [
  'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200',
  'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200',
  'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200',
  'bg-purple-100 dark:bg-purple-900/40 text-purple-900 dark:text-purple-200',
];

type Status = 'active' | 'won' | 'lost';

// Fisher-Yates: unbiased, unlike sorting by a random comparator
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function allWords(puzzle: OverlapPuzzle): string[] {
  return [...puzzle.categories.flatMap(c => c.words), puzzle.wildcard];
}

function categoryWords(puzzle: OverlapPuzzle, index: number): string[] {
  return [...puzzle.categories[index].words, puzzle.wildcard];
}

function sameSet(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every(w => b.includes(w));
}

/**
 * Completed-puzzle progress lives in localStorage, read via useSyncExternalStore
 * so the server render (no storage) and client render stay consistent.
 */
const storageListeners = new Set<() => void>();

function subscribeToCompleted(cb: () => void) {
  storageListeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    storageListeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
}

function getCompletedSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function parseCompleted(raw: string): number[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(n => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

function writeCompleted(next: number[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing or storage full — progress just isn't persisted
  }
  storageListeners.forEach(l => l());
}

export default function OverlapGame() {
  const [puzzle, setPuzzle] = useState<OverlapPuzzle | null>(null);
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('active');

  const completedRaw = useSyncExternalStore(
    subscribeToCompleted,
    getCompletedSnapshot,
    () => '[]',
  );
  const completed = useMemo(() => parseCompleted(completedRaw), [completedRaw]);

  const markCompleted = useCallback(
    (id: number) => {
      if (!completed.includes(id)) writeCompleted([...completed, id]);
    },
    [completed],
  );

  const startPuzzle = useCallback((p: OverlapPuzzle) => {
    setPuzzle(p);
    setTiles(shuffle(allWords(p)));
    setSelected([]);
    setSolved([]);
    setMistakes(0);
    setGuessed([]);
    setMessage(null);
    setStatus('active');
  }, []);

  const backToPicker = useCallback(() => setPuzzle(null), []);

  const toggleWord = useCallback(
    (word: string) => {
      if (status !== 'active') return;
      setMessage(null);
      setSelected(prev =>
        prev.includes(word) ? prev.filter(w => w !== word) : prev.length < 3 ? [...prev, word] : prev,
      );
    },
    [status],
  );

  const submitGuess = useCallback(() => {
    if (!puzzle || status !== 'active' || selected.length !== 3) return;

    const guessKey = [...selected].sort().join('|');
    if (guessed.includes(guessKey)) {
      setMessage('Already guessed!');
      return;
    }
    setGuessed(prev => [...prev, guessKey]);

    const matchIndex = puzzle.categories.findIndex(
      (_, i) => !solved.includes(i) && sameSet(selected, categoryWords(puzzle, i)),
    );

    if (matchIndex !== -1) {
      const nextSolved = [...solved, matchIndex];
      setSolved(nextSolved);
      // The two category-only words leave the grid; the wildcard stays in play
      setTiles(prev => prev.filter(w => !puzzle.categories[matchIndex].words.includes(w)));
      setSelected([]);
      if (nextSolved.length === puzzle.categories.length) {
        setStatus('won');
        markCompleted(puzzle.id);
      } else {
        setMessage('Correct!');
      }
      return;
    }

    // "One away" hint: 2 of the 3 selected words belong to some unsolved category
    const oneAway = puzzle.categories.some(
      (_, i) =>
        !solved.includes(i) &&
        selected.filter(w => categoryWords(puzzle, i).includes(w)).length === 2,
    );

    const nextMistakes = mistakes + 1;
    setMistakes(nextMistakes);
    setSelected([]);
    if (nextMistakes >= MAX_MISTAKES) {
      setStatus('lost');
      setMessage(null);
    } else {
      setMessage(oneAway ? 'One away!' : 'Not a group.');
    }
  }, [puzzle, status, selected, guessed, solved, mistakes, markCompleted]);

  /* ---------- Puzzle picker ---------- */

  if (!puzzle) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Overlap</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Nine words, four categories of three — but one sneaky word belongs to all four.
          </p>
        </div>

        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 list-disc list-inside">
          <li>Select three words that share a category, then submit</li>
          <li>Every category reuses the same hidden overlap word — find it and the puzzle cracks open</li>
          <li>You can make {MAX_MISTAKES} mistakes before the game ends</li>
        </ul>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            Choose a puzzle
          </h2>
          <div className="grid grid-cols-5 gap-2">
            {PUZZLES.map(p => {
              const done = completed.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => startPuzzle(p)}
                  className={`aspect-square rounded-lg text-sm font-semibold tabular-nums transition-all ${
                    done
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:opacity-80'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  aria-label={`Puzzle ${p.id}${done ? ' (solved)' : ''}`}
                >
                  {done ? '✓' : p.id}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
            {completed.length} of {PUZZLES.length} solved · progress saved in your browser
          </p>
        </div>
      </div>
    );
  }

  /* ---------- Playing ---------- */

  const finished = status !== 'active';
  const nextPuzzle = PUZZLES.find(p => p.id > puzzle.id && !completed.includes(p.id)) ??
    PUZZLES.find(p => !completed.includes(p.id) && p.id !== puzzle.id);

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg font-bold tracking-tight">Overlap</h1>
          <span className="text-sm text-slate-400 dark:text-slate-500 tabular-nums">
            #{puzzle.id}
          </span>
        </div>
        <button
          onClick={backToPicker}
          className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          ← All puzzles
        </button>
      </div>

      {/* Solved category bars */}
      {solved.length > 0 && (
        <div className="space-y-2">
          {solved.map((catIndex, order) => (
            <div
              key={puzzle.categories[catIndex].name}
              className={`rounded-lg px-4 py-2.5 text-center ${SOLVED_STYLES[order]}`}
            >
              <p className="text-sm font-bold">{puzzle.categories[catIndex].name}</p>
              <p className="text-xs">{categoryWords(puzzle, catIndex).join(' · ')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Word grid */}
      {status !== 'won' && (
        <div className="grid grid-cols-3 gap-2">
          {tiles.map(word => {
            const isSelected = selected.includes(word);
            return (
              <button
                key={word}
                onClick={() => toggleWord(word)}
                disabled={finished}
                className={`min-h-16 px-1 py-2 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide break-words transition-all ${
                  isSelected
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
                } ${finished ? 'opacity-50' : ''}`}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}

      {/* Mistakes + feedback */}
      {status === 'active' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">Mistakes:</span>
            <div className="flex gap-1.5">
              {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i < mistakes ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
          <span
            className="text-sm font-medium text-slate-600 dark:text-slate-400"
            role="status"
            aria-live="polite"
          >
            {message}
          </span>
        </div>
      )}

      {/* Action buttons */}
      {status === 'active' && (
        <div className="flex gap-2">
          <button
            onClick={submitGuess}
            disabled={selected.length !== 3}
            className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Submit
          </button>
          <button
            onClick={() => setSelected([])}
            disabled={selected.length === 0}
            className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Deselect
          </button>
        </div>
      )}

      {/* Won */}
      {status === 'won' && (
        <div className="space-y-4 text-center py-4">
          <p className="text-lg font-bold">
            Solved it! The overlap word was{' '}
            <span className="text-emerald-600 dark:text-emerald-400">{puzzle.wildcard}</span> —
            one word in all four categories.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 tabular-nums">
            {mistakes === 0 ? 'A perfect game — no mistakes.' : `Finished with ${mistakes} mistake${mistakes === 1 ? '' : 's'}.`}
          </p>
          <div className="flex justify-center gap-2">
            {nextPuzzle && (
              <button
                onClick={() => startPuzzle(nextPuzzle)}
                className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Next Puzzle →
              </button>
            )}
            <button
              onClick={backToPicker}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              All Puzzles
            </button>
          </div>
        </div>
      )}

      {/* Lost */}
      {status === 'lost' && (
        <div className="space-y-4">
          <p className="text-center font-semibold text-red-500 dark:text-red-400">
            Out of guesses! The answers were:
          </p>
          <div className="space-y-2">
            {puzzle.categories.map((cat, i) =>
              solved.includes(i) ? null : (
                <div
                  key={cat.name}
                  className="rounded-lg px-4 py-2.5 text-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <p className="text-sm font-bold">{cat.name}</p>
                  <p className="text-xs">{categoryWords(puzzle, i).join(' · ')}</p>
                </div>
              ),
            )}
          </div>
          <p className="text-sm text-center text-slate-500 dark:text-slate-400">
            The overlap word was{' '}
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {puzzle.wildcard}
            </span>
            .
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => startPuzzle(puzzle)}
              className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Try Again
            </button>
            <button
              onClick={backToPicker}
              className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              All Puzzles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
