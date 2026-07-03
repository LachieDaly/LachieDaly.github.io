import Link from "next/link";

export const metadata = {
  title: "Games",
  description: "Small browser games I've built for fun.",
};

const games = [
  {
    name: "Reviewd",
    href: "/games/reviewd",
    description:
      "Great movies, terrible reviews. Guess the movie from a scathing Letterboxd review — every wrong guess unlocks an easier one.",
    tags: ["Movie quiz", "20 rounds"],
  },
  {
    name: "Overlap",
    href: "/games/overlap",
    description:
      "Nine words, four categories of three — but one hidden word belongs to all four. 20 puzzles to crack.",
    tags: ["Word puzzle", "20 puzzles"],
  },
  {
    name: "Soundtrack Guesser",
    href: "/games/soundtrack",
    description:
      "Listen to iconic movie, game, and TV scores and guess where they're from.",
    tags: ["Music quiz", "10 questions"],
  },
];

export default function GamesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Games</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Small browser games I&apos;ve built for fun. No accounts, no ads — just play.
        </p>
      </section>

      <section>
        <ul className="space-y-4">
          {games.map((game) => (
            <li key={game.href}>
              <Link
                href={game.href}
                className="group block px-5 py-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-semibold text-lg">{game.name}</h2>
                  <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors text-sm">
                    Play →
                  </span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
