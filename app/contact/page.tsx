export const metadata = {
  title: "Contact | Lachlan Daly",
  description: "Get in touch with Lachlan Daly.",
};

const linkCardClass =
  "flex items-center justify-between group px-4 py-3 rounded-md border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all";

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-3">Contact</h1>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          Feel free to reach out — whether it&apos;s about a project, an opportunity, or
          just to say hello.
        </p>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
          Get in touch
        </h2>
        <div className="space-y-4">
          <a
            href="mailto:lachiedaly@gmail.com"
            className={linkCardClass}
          >
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                lachiedaly@gmail.com
              </p>
            </div>
            <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors text-sm">
              →
            </span>
          </a>

          <a
            href="https://github.com/LachieDaly"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCardClass}
          >
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                GitHub
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                github.com/LachieDaly
              </p>
            </div>
            <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors text-sm">
              →
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/lachlan-daly-a70978217"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCardClass}
          >
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                LinkedIn
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                linkedin.com/in/lachlan-daly-a70978217
              </p>
            </div>
            <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors text-sm">
              →
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
