'use client';

import { useState, useCallback } from 'react';
import type { Metadata } from 'next';

type Category = 'movie' | 'game' | 'tv';
type Phase = 'start' | 'playing' | 'answered' | 'end';

interface SoundtrackQuestion {
  id: string;
  category: Category;
  answer: string;
  wrongAnswers: [string, string, string];
  youtubeId: string;
  hint: string;
}

interface RuntimeQuestion extends SoundtrackQuestion {
  shuffledOptions: string[];
}

const QUESTIONS: SoundtrackQuestion[] = [
  {
    id: 'inception-time',
    category: 'movie',
    answer: 'Inception',
    wrongAnswers: ['Interstellar', 'The Dark Knight', 'Dunkirk'],
    youtubeId: 'hMQ7VhcCpuY',
    hint: 'Composed by Hans Zimmer · 2010',
  },
  {
    id: 'game-of-thrones',
    category: 'tv',
    answer: 'Game of Thrones',
    wrongAnswers: ['Stranger Things', 'The Witcher', 'Vikings'],
    youtubeId: 'eCemS3f-LDU',
    hint: 'Composed by Ramin Djawadi · 2011',
  },
  {
    id: 'star-wars',
    category: 'movie',
    answer: 'Star Wars',
    wrongAnswers: ['Indiana Jones', 'Harry Potter', 'Jurassic Park'],
    youtubeId: 'NR8XZkGwfA0',
    hint: 'Composed by John Williams · 1977',
  },
  {
    id: 'jurassic-park',
    category: 'movie',
    answer: 'Jurassic Park',
    wrongAnswers: ["Schindler's List", 'Hook', 'E.T. the Extra-Terrestrial'],
    youtubeId: 'lDlU08RU7Tk',
    hint: 'Composed by John Williams · 1993',
  },
  {
    id: 'halo',
    category: 'game',
    answer: 'Halo 2',
    wrongAnswers: ['DOOM (2016)', 'Destiny', 'Call of Duty'],
    youtubeId: 'bwikj_lQLT0',
    hint: "Composed by Martin O'Donnell & Michael Salvatori · 2004",
  },
  {
    id: 'zelda',
    category: 'game',
    answer: 'The Legend of Zelda',
    wrongAnswers: ['Chrono Trigger', 'Final Fantasy VII', 'Super Mario Bros'],
    youtubeId: '-N_zNB3jAbo',
    hint: 'Composed by Koji Kondo · 1986',
  },
  {
    id: 'interstellar',
    category: 'movie',
    answer: 'Interstellar',
    wrongAnswers: ['Inception', 'Arrival', 'Gravity'],
    youtubeId: 'dLxja_YEUVw',
    hint: 'Composed by Hans Zimmer · 2014',
  },
  {
    id: 'stranger-things',
    category: 'tv',
    answer: 'Stranger Things',
    wrongAnswers: ['Dark', 'Black Mirror', 'Twin Peaks'],
    youtubeId: '-RcPZdihrp4',
    hint: 'Composed by Kyle Dixon & Michael Stein · 2016',
  },
  {
    id: 'pirates',
    category: 'movie',
    answer: 'Pirates of the Caribbean',
    wrongAnswers: ['National Treasure', 'The Last Samurai', 'Gladiator'],
    youtubeId: 'n1KyvyrTWiM',
    hint: 'Composed by Klaus Badelt & Hans Zimmer · 2003',
  },
  {
    id: 'mario',
    category: 'game',
    answer: 'Super Mario Bros',
    wrongAnswers: ['Donkey Kong Country', 'Kirby', 'Mega Man'],
    youtubeId: 'nsff88sufkI',
    hint: 'Composed by Koji Kondo · 1985',
  },
  {
    id: 'mandalorian',
    category: 'tv',
    answer: 'The Mandalorian',
    wrongAnswers: ['Andor', 'Obi-Wan Kenobi', 'The Book of Boba Fett'],
    youtubeId: '2YDKxcdIXBs',
    hint: 'Composed by Ludwig Göransson · 2019',
  },
  {
    id: 'tetris',
    category: 'game',
    answer: 'Tetris',
    wrongAnswers: ['Pac-Man', 'Space Invaders', 'Sonic the Hedgehog'],
    youtubeId: 'tehZmdXbMac',
    hint: 'Traditional Russian folk song "Korobeiniki" · 1984',
  },
];

const CATEGORY_LABEL: Record<Category, string> = {
  movie: 'Movie',
  game: 'Game',
  tv: 'TV',
};

const CATEGORY_STYLE: Record<Category, string> = {
  movie: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  game: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  tv: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
};

const TOTAL = 10;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildGame(): RuntimeQuestion[] {
  return shuffle(QUESTIONS)
    .slice(0, TOTAL)
    .map(q => ({
      ...q,
      shuffledOptions: shuffle([...q.wrongAnswers, q.answer]),
    }));
}

function resultMessage(score: number): string {
  const pct = score / TOTAL;
  if (pct === 1) return "Perfect score! You're a soundtrack legend.";
  if (pct >= 0.8) return 'Outstanding — you really know your scores.';
  if (pct >= 0.6) return 'Solid effort. You have a good ear.';
  if (pct >= 0.4) return 'Not bad! Keep listening to more soundtracks.';
  return 'Tough game. Time to revisit some classics.';
}

export default function SoundtrackGuesser() {
  const [phase, setPhase] = useState<Phase>('start');
  const [questions, setQuestions] = useState<RuntimeQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setQuestions(buildGame());
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback(
    (option: string) => {
      if (phase !== 'playing') return;
      setSelected(option);
      if (option === questions[current].answer) setScore(s => s + 1);
      setPhase('answered');
    },
    [phase, questions, current],
  );

  const nextQuestion = useCallback(() => {
    if (current + 1 >= TOTAL) {
      setPhase('end');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setPhase('playing');
    }
  }, [current]);

  if (phase === 'start') {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Soundtrack Guesser</h1>
          <p className="text-slate-500 dark:text-slate-400">
            How well do you know movie, game, and TV scores? Listen to each clip and pick the right title.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['movie', 'game', 'tv'] as Category[]).map(cat => (
            <span
              key={cat}
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_STYLE[cat]}`}
            >
              {CATEGORY_LABEL[cat]}
            </span>
          ))}
        </div>

        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 list-disc list-inside">
          <li>{TOTAL} questions drawn randomly from a pool of {QUESTIONS.length}</li>
          <li>Press play on each clip, then select your answer</li>
          <li>No time limit — take your time to listen</li>
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

        <button
          onClick={startGame}
          className="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-80 transition-opacity"
        >
          Play Again
        </button>
      </div>
    );
  }

  const q = questions[current];
  const isAnswered = phase === 'answered';

  return (
    <div className="space-y-5">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400 dark:text-slate-500 tabular-nums">
            {current + 1} / {TOTAL}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_STYLE[q.category]}`}
          >
            {CATEGORY_LABEL[q.category]}
          </span>
        </div>
        <span className="text-sm font-semibold tabular-nums text-slate-600 dark:text-slate-400">
          Score: {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-slate-900 dark:bg-slate-100 transition-all duration-300"
          style={{ width: `${(current / TOTAL) * 100}%` }}
        />
      </div>

      {/* YouTube embed */}
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <iframe
          key={q.id}
          src={`https://www.youtube-nocookie.com/embed/${q.youtubeId}?rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full aspect-video"
          title="Soundtrack clip"
        />
      </div>

      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Which movie, game, or TV show does this soundtrack belong to?
      </p>

      {/* Answer options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {q.shuffledOptions.map(option => {
          let style =
            'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100';
          if (isAnswered) {
            if (option === q.answer) {
              style = 'bg-emerald-500 dark:bg-emerald-600 text-white border-transparent';
            } else if (option === selected) {
              style = 'bg-red-500 dark:bg-red-600 text-white border-transparent';
            } else {
              style =
                'border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 opacity-40';
            }
          }
          return (
            <button
              key={option}
              onClick={() => selectAnswer(option)}
              disabled={isAnswered}
              className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Hint + next button */}
      {isAnswered && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-slate-400 dark:text-slate-500">{q.hint}</p>
          <button
            onClick={nextQuestion}
            className="ml-4 shrink-0 px-5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {current + 1 >= TOTAL ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
