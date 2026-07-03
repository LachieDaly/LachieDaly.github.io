'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { ROUNDS, type ReviewRound } from './reviews';

type Phase = 'start' | 'playing' | 'answered' | 'end';

const TOTAL = ROUNDS.length;
const MAX_GUESSES = 3;

// Fisher-Yates: unbiased, unlike sorting by a random comparator
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function normalise(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^the /, '');
}

// Small edit distance so near-misses like "casblanca" still count
function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const prev = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(
        prev[j] + 1,
        prev[j - 1] + 1,
        diag + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      diag = tmp;
    }
  }
  return prev[b.length];
}

function isCorrect(guess: string, round: ReviewRound): boolean {
  const g = normalise(guess);
  if (!g) return false;
  const accepted = [round.answer, ...round.altAnswers].map(normalise);
  return accepted.some(a => {
    if (a === g) return true;
    const tolerance = a.length > 8 ? 2 : a.length > 4 ? 1 : 0;
    return editDistance(a, g) <= tolerance;
  });
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value % 1 !== 0;
  return (
    <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-tight" aria-label={`${value} out of 5 stars`}>
      {'★'.repeat(full)}
      {half && '½'}
    </span>
  );
}

function ReviewCard({ round, revealed }: { round: ReviewRound; revealed: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 via-emerald-500 to-sky-500 opacity-80"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Review by a Letterboxd member
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {round.stars !== undefined ? <Stars value={round.stars} /> : 'No rating'}
            {' · '}
            {revealed ? (
              <span className="font-medium text-slate-600 dark:text-slate-300">
                {round.answer} ({round.year})
              </span>
            ) : (
              'watched ████████'
            )}
          </p>
        </div>
      </div>
      <blockquote className="text-lg leading-relaxed text-slate-800 dark:text-slate-200">
        {round.review}
      </blockquote>
    </div>
  );
}

function resultMessage(score: number): string {
  const pct = score / TOTAL;
  if (pct === 1) return 'Perfect. You can identify a movie purely by the hate it gets.';
  if (pct >= 0.8) return 'Outstanding — barely a review gets past you.';
  if (pct >= 0.6) return 'Solid. You clearly spend time in the trenches of Letterboxd.';
  if (pct >= 0.4) return 'Not bad, but the half-star army defeated you more than once.';
  return 'Rough. Maybe watch the movies before reading the reviews.';
}

export default function Reviewd() {
  const [phase, setPhase] = useState<Phase>('start');
  const [order, setOrder] = useState<ReviewRound[]>([]);
  const [current, setCurrent] = useState(0);
  const [guess, setGuess] = useState('');
  const [misses, setMisses] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const round = order[current];

  const startGame = useCallback(() => {
    setOrder(shuffle(ROUNDS));
    setCurrent(0);
    setGuess('');
    setMisses([]);
    setSolved(false);
    setResults([]);
    setScore(0);
    setPhase('playing');
  }, []);

  const finishRound = useCallback((won: boolean) => {
    setSolved(won);
    setResults(r => [...r, won]);
    if (won) setScore(s => s + 1);
    setPhase('answered');
  }, []);

  const submitGuess = useCallback(() => {
    const attempt = guess.trim();
    if (!attempt || phase !== 'playing') return;
    if (isCorrect(attempt, round)) {
      finishRound(true);
    } else {
      const nextMisses = [...misses, attempt];
      setMisses(nextMisses);
      setGuess('');
      if (nextMisses.length >= MAX_GUESSES) finishRound(false);
      else inputRef.current?.focus();
    }
  }, [guess, phase, round, misses, finishRound]);

  const nextRound = useCallback(() => {
    if (current + 1 >= TOTAL) {
      setPhase('end');
    } else {
      setCurrent(c => c + 1);
      setGuess('');
      setMisses([]);
      setSolved(false);
      setPhase('playing');
    }
  }, [current]);

  const guessesLeft = MAX_GUESSES - misses.length;
  const placeholder = useMemo(
    () =>
      misses.length === 0
        ? 'Name that movie…'
        : `${guessesLeft} ${guessesLeft === 1 ? 'guess' : 'guesses'} left…`,
    [misses.length, guessesLeft],
  );

  if (phase === 'start') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Reviewd</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Great movies, terrible reviews. Each round shows a scathing low-star Letterboxd
            review — you name the movie being trashed.
          </p>
        </div>

        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 list-disc list-inside">
          <li>{TOTAL} rounds, shuffled each game</li>
          <li>Type your guess — {MAX_GUESSES} attempts per round, minor typos forgiven</li>
          <li>A hint unlocks after each wrong guess</li>
          <li>Titles in the reviews are redacted: ████</li>
        </ul>

        <button
          onClick={startGame}
          className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (phase === 'end') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Results</h1>
          <p className="text-slate-500 dark:text-slate-400">{resultMessage(score)}</p>
        </div>

        <div className="py-10 text-center">
          <span className="text-7xl font-bold tabular-nums">{score}</span>
          <span className="text-4xl text-slate-300 dark:text-slate-600 font-bold">/{TOTAL}</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            The movies
          </h2>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {order.map((r, i) => (
              <li key={r.id} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                <p className="min-w-0 font-medium text-slate-700 dark:text-slate-300 truncate">
                  {r.answer}
                  <span className="ml-2 text-xs text-slate-400 dark:text-slate-500">{r.year}</span>
                </p>
                <span
                  className={`shrink-0 font-semibold ${
                    results[i]
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-500 dark:text-red-400'
                  }`}
                >
                  {results[i] ? '✓' : '✗'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={startGame}
          className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >
          Play Again
        </button>
      </div>
    );
  }

  const isAnswered = phase === 'answered';

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400 dark:text-slate-500 tabular-nums">
          {current + 1} / {TOTAL}
        </span>
        <span className="text-sm font-semibold tabular-nums text-slate-600 dark:text-slate-400">
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-300"
          style={{ width: `${((current + (isAnswered ? 1 : 0)) / TOTAL) * 100}%` }}
        />
      </div>

      <ReviewCard round={round} revealed={isAnswered} />

      {!isAnswered && (
        <>
          <form
            onSubmit={e => {
              e.preventDefault();
              submitGuess();
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={guess}
              onChange={e => setGuess(e.target.value)}
              placeholder={placeholder}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Your movie guess"
              className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-slate-400 dark:focus:border-slate-500"
            />
            <button
              type="submit"
              disabled={!guess.trim()}
              className="shrink-0 px-5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              Guess
            </button>
          </form>

          {/* Wrong guesses + unlocked hints */}
          {misses.length > 0 && (
            <div className="space-y-1.5 text-sm">
              {misses.map((m, i) => (
                <p key={i} className="text-red-500 dark:text-red-400">
                  ✗ {m}
                </p>
              ))}
              <p className="text-slate-500 dark:text-slate-400">
                <span className="font-medium">Hint:</span>{' '}
                {misses.length === 1 ? round.hint1 : round.hint2}
              </p>
            </div>
          )}

          <button
            onClick={() => finishRound(false)}
            className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline underline-offset-2"
          >
            Give up and reveal
          </button>
        </>
      )}

      {isAnswered && (
        <div className="flex items-center justify-between pt-1">
          <p
            className={`text-sm font-medium ${
              solved
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-500 dark:text-red-400'
            }`}
          >
            {solved ? 'Correct!' : `It was ${round.answer} (${round.year})`}
          </p>
          <button
            onClick={nextRound}
            autoFocus
            className="ml-4 shrink-0 px-5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {current + 1 >= TOTAL ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
