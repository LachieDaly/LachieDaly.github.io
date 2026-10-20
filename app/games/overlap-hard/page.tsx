'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';
import { PUZZLES, type OverlapHardPuzzle } from './puzzles';
import {
  BASE_POINTS,
  DIFFICULTY_COLORS,
  DIFFICULTY_LABELS,
  MAX_SCORE,
  categoryPoints,
  difficultyColor,
  orderMultiplier,
  tileBackground,
  totalScore,
  type Difficulty,
} from '../overlap/scoring';
import { sounds } from '../overlap/sounds';
import Confetti from '../overlap/confetti';
import MuteButton from '../overlap/mute-button';

const MAX_MISTAKES = 3;
const GROUP_SIZE = 4;
const STORAGE_KEY = 'overlap-hard-completed-v1';

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

function allWords(puzzle: OverlapHardPuzzle): string[] {
  return [...puzzle.categories.flatMap(c => c.words), puzzle.wildcard, ...puzzle.decoys];
}

function categoryWords(puzzle: OverlapHardPuzzle, index: number): string[] {
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

export default function OverlapHardGame() {
  const [puzzle, setPuzzle] = useState<OverlapHardPuzzle | null>(null);
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

  const startPuzzle = useCallback((p: OverlapHardPuzzle) => {
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
      if (selected.includes(word)) {
        setSelected(selected.filter(w => w !== word));
        return;
      }
      if (selected.length >= GROUP_SIZE) return;
      const next = [...selected, word];
      setSelected(next);
      // Pitch rises with each word selected
      sounds.select(next.length);
    },
    [status, selected],
  );

  const submitGuess = useCallback(() => {
    if (!puzzle || status !== 'active' || selected.length !== GROUP_SIZE) return;

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
      // Every tile stays on the board so the shared word isn't given away —
      // the whole guess is tinted with the category's colour instead
      setSelected([]);
      const points = categoryPoints(puzzle.categories[matchIndex].difficulty, solved.length);
      if (nextSolved.length === puzzle.categories.length) {
        setStatus('won');
        setMessage(null);
        markCompleted(puzzle.id);
        sounds.win();
      } else {
        setMessage(`Correct! +${points}`);
        sounds.correct();
      }
      return;
    }

    // "One away" hint: 3 of the 4 selected words belong to some unsolved category
    const oneAway = puzzle.categories.some(
      (_, i) =>
        !solved.includes(i) &&
        selected.filter(w => categoryWords(puzzle, i).includes(w)).length === GROUP_SIZE - 1,
    );

    const nextMistakes = mistakes + 1;
    setMistakes(nextMistakes);
    setSelected([]);
    sounds.wrong();
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
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold tracking-tight">Overlap Hard</h1>
            <MuteButton />
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            Sixteen words, four categories of four — one sneaky word belongs to all four, and
            three red herrings belong to none. Looking for something gentler? Try{' '}
            <Link href="/games/overlap" className="underline underline-offset-2 hover:text-slate-900 dark:hover:text-slate-100">
              the original Overlap
            </Link>
            .
          </p>
        </div>

        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 list-disc list-inside">
          <li>Select four words that share a category, then submit</li>
          <li>Every word stays on the board — solved categories are tinted a colour</li>
          <li>One hidden word completes all four categories, so you&apos;ll reuse it every time</li>
          <li>Three decoys fit no category at all — they&apos;re left over when you finish</li>
          <li>You can make {MAX_MISTAKES} mistakes before the game ends</li>
          <li>
            Each category has a difficulty, from{' '}
            <span className="inline-flex items-center gap-1 align-middle">
              {DIFFICULTY_COLORS.map((c, i) => (
                <span key={i} className={`inline-block w-2.5 h-2.5 rounded-sm ${c.dot}`} />
              ))}
            </span>{' '}
            yellow (easiest) to purple (hardest)
          </li>
          <li>
            Harder categories score more, and earlier solves are multiplied (×4, ×3, ×2, ×1) —
            solve hardest to easiest for the top score of {MAX_SCORE}
          </li>
        </ul>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4">
            Choose a puzzle
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {PUZZLES.map(p => {
              const done = completed.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => startPuzzle(p)}
                  className={`aspect-square rounded-lg text-sm font-semibold tabular-nums transition-all ${
                    done
                      ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:opacity-80'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
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

  // Difficulty of every solved category a word belongs to, in solve order.
  // The overlap word accumulates a colour per solved category — but only once
  // it has been part of a correct guess, so it's never singled out early.
  const solvedDifficultiesFor = (word: string): Difficulty[] =>
    solved
      .filter(catIndex => categoryWords(puzzle, catIndex).includes(word))
      .map(catIndex => puzzle.categories[catIndex].difficulty);

  const score = totalScore(solved.map(catIndex => puzzle.categories[catIndex].difficulty));

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h1 className="text-lg font-bold tracking-tight">Overlap Hard</h1>
          <span className="text-sm text-slate-400 dark:text-slate-500 tabular-nums">
            #{puzzle.id}
          </span>
        </div>
        <span className="text-sm font-semibold tabular-nums" aria-label={`Score ${score}`}>
          {score} pts
        </span>
        <div className="flex items-center gap-2">
          <MuteButton />
          <button
            onClick={backToPicker}
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            ← All puzzles
          </button>
        </div>
      </div>

      {/* Solved category chips — names only while playing, so the board never
          gives away which of the three words is the shared one */}
      {solved.length > 0 && status === 'active' && (
        <div className="flex flex-wrap gap-2">
          {solved.map(catIndex => (
            <span
              key={puzzle.categories[catIndex].name}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full ${difficultyColor(puzzle.categories[catIndex].difficulty).chip}`}
            >
              {puzzle.categories[catIndex].name}
            </span>
          ))}
        </div>
      )}

      {/* Word grid — every word stays put and stays choosable; solved guesses
          are tinted, and words in several solved categories blend the colours */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {tiles.map(word => {
          const isSelected = selected.includes(word);
          const difficulties = solvedDifficultiesFor(word);
          const tinted = difficulties.length > 0 && !isSelected;
          return (
            <button
              key={word}
              onClick={() => toggleWord(word)}
              disabled={finished}
              style={tinted ? { background: tileBackground(difficulties) } : undefined}
              className={`min-h-16 px-1 py-2 rounded-lg text-[11px] sm:text-sm font-semibold uppercase sm:tracking-wide break-words transition-all ${
                isSelected
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 scale-[0.97]'
                  : tinted
                    ? 'text-slate-900 dark:text-slate-100 hover:opacity-80'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700'
              } ${status === 'lost' ? 'opacity-50' : ''}`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* Mistakes + feedback */}
      {status === 'active' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500">Mistakes:</span>
            <div className="flex gap-1.5">
              {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
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
            disabled={selected.length !== GROUP_SIZE}
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

      {/* Full reveal once the game is over — safe to name the overlap word now */}
      {finished && (
        <div className="space-y-2">
          {solved.map((catIndex, order) => {
            const { name, difficulty } = puzzle.categories[catIndex];
            return (
              <div
                key={name}
                className={`rounded-lg px-4 py-2.5 text-center ${difficultyColor(difficulty).chip}`}
              >
                <p className="text-sm font-bold">{name}</p>
                <p className="text-xs">{categoryWords(puzzle, catIndex).join(' · ')}</p>
                <p className="text-[11px] mt-1 opacity-75 tabular-nums">
                  {DIFFICULTY_LABELS[difficulty]} · {BASE_POINTS[difficulty]} × {orderMultiplier(order)} = +
                  {categoryPoints(difficulty, order)}
                </p>
              </div>
            );
          })}
          {puzzle.categories.map((cat, i) =>
            solved.includes(i) ? null : (
              <div
                key={cat.name}
                className="rounded-lg px-4 py-2.5 text-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <p className="text-sm font-bold">{cat.name}</p>
                <p className="text-xs">{categoryWords(puzzle, i).join(' · ')}</p>
                <p className="text-[11px] mt-1 opacity-75 inline-flex items-center gap-1.5">
                  <span className={`inline-block w-2 h-2 rounded-sm ${difficultyColor(cat.difficulty).dot}`} />
                  {DIFFICULTY_LABELS[cat.difficulty]} · not solved
                </p>
              </div>
            ),
          )}
          <div className="rounded-lg px-4 py-2.5 text-center border border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400">
            <p className="text-sm font-bold">Red herrings</p>
            <p className="text-xs">{puzzle.decoys.join(' · ')}</p>
          </div>
        </div>
      )}

      {/* Won */}
      {status === 'won' && <Confetti key={puzzle.id} />}
      {status === 'won' && (
        <div className="space-y-4 text-center py-4">
          <p className="text-lg font-bold">
            Solved it! The overlap word was{' '}
            <span className="text-emerald-600 dark:text-emerald-400">{puzzle.wildcard}</span> —
            one word in all four categories, with {puzzle.decoys.length} red herrings left over.
          </p>
          <p className="text-2xl font-bold tabular-nums">
            {score} <span className="text-base font-medium text-slate-400 dark:text-slate-500">/ {MAX_SCORE} pts</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 tabular-nums">
            {score === MAX_SCORE && 'Hardest to easiest — top score! '}
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
            Out of guesses!
          </p>
          <p className="text-sm text-center font-semibold tabular-nums">
            {score} / {MAX_SCORE} pts
          </p>
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
