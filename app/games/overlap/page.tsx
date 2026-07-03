'use client';

import { useCallback, useMemo, useState } from 'react';

interface CategoryDef {
  id: string;
  name: string;
  words: [string, string, string];
}

interface Puzzle {
  id: string;
  shared: string;
  categories: [CategoryDef, CategoryDef, CategoryDef, CategoryDef];
}

type Phase = 'start' | 'playing' | 'won' | 'lost';

const PUZZLES: Puzzle[] = [
  {
    id: 'spring',
    shared: 'SPRING',
    categories: [
      { id: 'seasons', name: 'Seasons', words: ['SPRING', 'SUMMER', 'WINTER'] },
      { id: 'water', name: 'Sources of water', words: ['SPRING', 'WELL', 'STREAM'] },
      { id: 'mechanical', name: 'Mechanical parts', words: ['SPRING', 'COIL', 'GEAR'] },
      { id: 'jump', name: 'Verbs meaning "jump"', words: ['SPRING', 'LEAP', 'BOUNCE'] },
    ],
  },
  {
    id: 'match',
    shared: 'MATCH',
    categories: [
      { id: 'contest', name: 'Sports contests', words: ['MATCH', 'BOUT', 'GAME'] },
      { id: 'fire', name: 'Fire starters', words: ['MATCH', 'LIGHTER', 'FLINT'] },
      { id: 'romance', name: 'Romance', words: ['MATCH', 'DATE', 'CRUSH'] },
      { id: 'identical', name: 'Identical pair', words: ['MATCH', 'TWIN', 'PAIR'] },
    ],
  },
  {
    id: 'diamond',
    shared: 'DIAMOND',
    categories: [
      { id: 'suits', name: 'Card suits', words: ['DIAMOND', 'CLUB', 'SPADE'] },
      { id: 'gems', name: 'Gemstones', words: ['DIAMOND', 'RUBY', 'EMERALD'] },
      { id: 'baseball', name: 'Baseball terms', words: ['DIAMOND', 'BASE', 'PITCH'] },
      { id: 'shapes', name: 'Shapes', words: ['DIAMOND', 'OVAL', 'HEXAGON'] },
    ],
  },
];

const MAX_MISTAKES = 4;

const CATEGORY_COLORS = [
  'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700/60',
  'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-900/30 dark:text-sky-200 dark:border-sky-700/60',
  'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-700/60',
  'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-300 dark:bg-fuchsia-900/30 dark:text-fuchsia-200 dark:border-fuchsia-700/60',
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickPuzzle(exclude?: string): Puzzle {
  const pool = exclude ? PUZZLES.filter(p => p.id !== exclude) : PUZZLES;
  return pool[Math.floor(Math.random() * pool.length)];
}

function uniqueWords(p: Puzzle): string[] {
  const set = new Set<string>();
  p.categories.forEach(c => c.words.forEach(w => set.add(w)));
  return [...set];
}

function sameTrio(a: string[], b: readonly string[]): boolean {
  if (a.length !== 3 || b.length !== 3) return false;
  const setB = new Set(b);
  return a.every(x => setB.has(x));
}

export default function OverlapGame() {
  const [phase, setPhase] = useState<Phase>('start');
  const [puzzle, setPuzzle] = useState<Puzzle>(() => PUZZLES[0]);
  const [wordOrder, setWordOrder] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [wobbleTick, setWobbleTick] = useState(0);

  const startGame = useCallback((next?: Puzzle) => {
    const chosen = next ?? pickPuzzle();
    setPuzzle(chosen);
    setWordOrder(shuffle(uniqueWords(chosen)));
    setSelected([]);
    setFoundIds([]);
    setMistakes(0);
    setPhase('playing');
  }, []);

  const foundCategories = useMemo(
    () => foundIds.map(id => puzzle.categories.find(c => c.id === id)!),
    [foundIds, puzzle],
  );

  const nonSharedFoundWords = useMemo(() => {
    const set = new Set<string>();
    foundCategories.forEach(cat => {
      cat.words.forEach(w => {
        if (w !== puzzle.shared) set.add(w);
      });
    });
    return set;
  }, [foundCategories, puzzle.shared]);

  const remainingWords = useMemo(
    () => wordOrder.filter(w => !nonSharedFoundWords.has(w)),
    [wordOrder, nonSharedFoundWords],
  );

  const toggleWord = useCallback(
    (word: string) => {
      if (phase !== 'playing') return;
      if (nonSharedFoundWords.has(word)) return;
      setSelected(prev => {
        if (prev.includes(word)) return prev.filter(w => w !== word);
        if (prev.length >= 3) return prev;
        return [...prev, word];
      });
    },
    [phase, nonSharedFoundWords],
  );

  const submit = useCallback(() => {
    if (phase !== 'playing' || selected.length !== 3) return;
    const remainingCats = puzzle.categories.filter(c => !foundIds.includes(c.id));
    const match = remainingCats.find(c => sameTrio(selected, c.words));
    if (match) {
      const nextFound = [...foundIds, match.id];
      setFoundIds(nextFound);
      setSelected([]);
      if (nextFound.length === puzzle.categories.length) {
        setPhase('won');
      }
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);
      setWobbleTick(t => t + 1);
      if (nextMistakes >= MAX_MISTAKES) {
        setPhase('lost');
      } else {
        setSelected([]);
      }
    }
  }, [phase, selected, puzzle, foundIds, mistakes]);

  const deselect = useCallback(() => setSelected([]), []);

  if (phase === 'start') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Overlap</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Nine words. Four categories. One word belongs to <em>all four</em>.
            Find each trio.
          </p>
        </div>

        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 list-disc list-inside">
          <li>Each category is exactly 3 words</li>
          <li>The overlap word appears in every category</li>
          <li>Guess a trio by selecting 3 words, then submit</li>
          <li>{MAX_MISTAKES} wrong guesses and the puzzle is over</li>
        </ul>

        <button
          onClick={() => startGame()}
          className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >
          Start Game
        </button>
      </div>
    );
  }

  const isEnded = phase === 'won' || phase === 'lost';
  const remainingCats = puzzle.categories.filter(c => !foundIds.includes(c.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Overlap</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">Mistakes</span>
          <div className="flex gap-1">
            {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 rounded-full ${
                  i < mistakes
                    ? 'bg-red-500 dark:bg-red-400'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Solved categories */}
      {foundCategories.length > 0 && (
        <div className="space-y-2">
          {foundCategories.map((cat, i) => {
            const colorIdx = puzzle.categories.findIndex(c => c.id === cat.id);
            return (
              <div
                key={cat.id}
                className={`rounded-xl px-4 py-3 border ${CATEGORY_COLORS[colorIdx % CATEGORY_COLORS.length]}`}
                style={{ animation: `overlapFade 300ms ease-out ${i * 40}ms both` }}
              >
                <div className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  {cat.name}
                </div>
                <div className="text-sm font-medium mt-0.5">
                  {cat.words.join(' · ')}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Word grid */}
      {!isEnded && (
        <div
          key={wobbleTick}
          className="grid grid-cols-3 gap-2.5"
          style={
            wobbleTick > 0
              ? { animation: 'overlapShake 400ms ease-in-out' }
              : undefined
          }
        >
          {remainingWords.map(word => {
            const isSelected = selected.includes(word);
            const isShared = word === puzzle.shared;
            const showSharedHint = isShared && foundCategories.length > 0;
            let style =
              'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100';
            if (isSelected) {
              style =
                'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border-transparent';
            } else if (showSharedHint) {
              style =
                'border-2 border-dashed border-amber-400 dark:border-amber-500 text-slate-900 dark:text-slate-100 hover:bg-amber-50/50 dark:hover:bg-amber-900/10';
            }
            return (
              <button
                key={word}
                onClick={() => toggleWord(word)}
                className={`px-2 py-4 sm:py-5 rounded-lg text-sm sm:text-base font-semibold uppercase tracking-wide transition-all ${style}`}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}

      {/* Controls */}
      {!isEnded && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {selected.length} / 3 selected
          </p>
          <div className="flex gap-2">
            <button
              onClick={deselect}
              disabled={selected.length === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
            >
              Deselect
            </button>
            <button
              onClick={submit}
              disabled={selected.length !== 3}
              className="px-5 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-80 disabled:opacity-40 disabled:hover:opacity-40 transition-opacity"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* End state */}
      {isEnded && (
        <div className="space-y-4 pt-2">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="text-lg font-semibold mb-1">
              {phase === 'won' ? 'Solved!' : 'Out of guesses'}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {phase === 'won'
                ? `The overlap word was `
                : `Here's what you missed. The overlap word was `}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {puzzle.shared}
              </span>
              .
            </p>
          </div>

          {phase === 'lost' && remainingCats.length > 0 && (
            <div className="space-y-2">
              {remainingCats.map(cat => {
                const colorIdx = puzzle.categories.findIndex(c => c.id === cat.id);
                return (
                  <div
                    key={cat.id}
                    className={`rounded-xl px-4 py-3 border opacity-70 ${CATEGORY_COLORS[colorIdx % CATEGORY_COLORS.length]}`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-widest opacity-70">
                      {cat.name}
                    </div>
                    <div className="text-sm font-medium mt-0.5">
                      {cat.words.join(' · ')}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => startGame(pickPuzzle(puzzle.id))}
              className="px-5 py-2 rounded-lg text-sm font-medium bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:opacity-80 transition-opacity"
            >
              New Puzzle
            </button>
            <button
              onClick={() => startGame(puzzle)}
              className="px-5 py-2 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Retry This One
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes overlapShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes overlapFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
