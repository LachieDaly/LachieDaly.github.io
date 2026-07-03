import Link from 'next/link';

const games = [
  {
    href: '/games/overlap',
    title: 'Overlap',
    description:
      'Nine words, four categories, one word in all four. Sort each trio before you run out of guesses.',
  },
  {
    href: '/games/soundtrack',
    title: 'Soundtrack Guesser',
    description:
      'Listen to iconic movie, game, and TV scores and name the source. Ten questions, no time limit.',
  },
];

export default function GamesIndex() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Games</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Small browser games built for fun.
        </p>
      </section>

      <ul className="space-y-3">
        {games.map(game => (
          <li key={game.href}>
            <Link
              href={game.href}
              className="block rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            >
              <div className="font-semibold mb-1">{game.title}</div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {game.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
