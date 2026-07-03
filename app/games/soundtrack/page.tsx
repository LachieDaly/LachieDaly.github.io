'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

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

// Fisher-Yates: unbiased, unlike sorting by a random comparator
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildGame(): RuntimeQuestion[] {
  return shuffle(QUESTIONS)
    .slice(0, TOTAL)
    .map(q => ({
      ...q,
      shuffledOptions: shuffle([...q.wrongAnswers, q.answer]),
    }));
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      width: string;
      height: string;
      host: string;
      playerVars: Record<string, number>;
      events: {
        onReady: () => void;
        onStateChange: (e: { data: number }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; BUFFERING: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let ytApiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!ytApiPromise) {
    ytApiPromise = new Promise(resolve => {
      window.onYouTubeIframeAPIReady = () => resolve(window.YT as YTNamespace);
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    });
  }
  return ytApiPromise;
}

// Plays the clip audio-only while the question is open: the real YouTube iframe
// stays offscreen so its title overlay and thumbnail can't reveal the answer.
// Once `revealed` flips (after answering), the video is shown normally.
function SoundtrackPlayer({ videoId, revealed }: { videoId: string; revealed: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const container = containerRef.current;

    loadYouTubeApi().then(YT => {
      if (cancelled || !container) return;
      const mount = document.createElement('div');
      container.appendChild(mount);
      playerRef.current = new YT.Player(mount, {
        videoId,
        width: '100%',
        height: '100%',
        host: 'https://www.youtube-nocookie.com',
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onReady: () => {
            if (!cancelled) setReady(true);
          },
          onStateChange: e => {
            if (cancelled) return;
            setPlaying(e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      if (container) container.innerHTML = '';
    };
  }, [videoId]);

  const toggle = () => {
    const player = playerRef.current;
    if (!player || !ready) return;
    if (playing) player.pauseVideo();
    else player.playVideo();
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <div
        className={
          revealed
            ? 'aspect-video'
            : 'absolute -left-[9999px] top-0 w-px h-px overflow-hidden opacity-0 pointer-events-none'
        }
        aria-hidden={!revealed}
      >
        <div ref={containerRef} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
      </div>

      {!revealed && (
        <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900">
          <style>{`@keyframes st-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }`}</style>
          <button
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? 'Pause soundtrack' : 'Play soundtrack'}
            className="shrink-0 w-12 h-12 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <rect x="2" y="1" width="4" height="14" rx="1" />
                <rect x="10" y="1" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M4 1.6a1 1 0 0 1 1.52-.85l10 6.4a1 1 0 0 1 0 1.7l-10 6.4A1 1 0 0 1 4 14.4V1.6z" transform="scale(0.85) translate(1.5 1.5)" />
              </svg>
            )}
          </button>

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Mystery soundtrack
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {ready ? 'Audio only — the video stays hidden until you answer' : 'Loading player…'}
            </p>
          </div>

          <div className="ml-auto flex items-end gap-1 h-8" aria-hidden="true">
            {[0, 1, 2, 3, 4].map(i => (
              <span
                key={i}
                className="w-1 h-full rounded-full bg-slate-300 dark:bg-slate-600 origin-bottom"
                style={
                  playing
                    ? { animation: `st-eq ${0.8 + i * 0.13}s ease-in-out ${i * 0.1}s infinite` }
                    : { transform: 'scaleY(0.3)' }
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
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
  const [picks, setPicks] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setQuestions(buildGame());
    setCurrent(0);
    setSelected(null);
    setPicks([]);
    setScore(0);
    setPhase('playing');
  }, []);

  const selectAnswer = useCallback(
    (option: string) => {
      if (phase !== 'playing') return;
      setSelected(option);
      setPicks(p => [...p, option]);
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

        {/* Per-question review */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Your answers
          </h2>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {questions.map((q, i) => {
              const correct = picks[i] === q.answer;
              return (
                <li key={q.id} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-700 dark:text-slate-300 truncate">
                      {q.answer}
                      <span
                        className={`ml-2 text-xs font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_STYLE[q.category]}`}
                      >
                        {CATEGORY_LABEL[q.category]}
                      </span>
                    </p>
                    {!correct && (
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        You picked {picks[i]}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 font-semibold ${
                      correct
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {correct ? '✓' : '✗'}
                  </span>
                </li>
              );
            })}
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
          style={{ width: `${((current + (isAnswered ? 1 : 0)) / TOTAL) * 100}%` }}
        />
      </div>

      {/* Hidden-video soundtrack player (revealed after answering) */}
      <SoundtrackPlayer key={q.id} videoId={q.youtubeId} revealed={isAnswered} />

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
