export const metadata = {
  title: "Projects | Lachlan Daly",
  description: "A collection of projects I've built or contributed to.",
};

const projects = [
  {
    name: "LachieDaly.github.io",
    description:
      "This site — a personal portfolio and blog built with Next.js and Tailwind CSS, statically exported and hosted on GitHub Pages.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/LachieDaly/LachieDaly.github.io",
    url: "https://lachiedaly.github.io",
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Projects</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          A collection of projects I&apos;ve built or contributed to.
        </p>
      </section>

      <section>
        {projects.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400">No projects yet. Check back soon.</p>
        ) : (
          <ul className="space-y-8">
            {projects.map((project) => (
              <li key={project.name}>
                <article>
                  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                    <h2 className="font-semibold text-lg">{project.name}</h2>
                    <div className="flex gap-3 text-xs">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                          Live
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
