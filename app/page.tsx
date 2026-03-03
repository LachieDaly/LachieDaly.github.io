const experience = [
  {
    company: "MoveMeIn",
    location: "Brisbane, QLD · Hybrid",
    roles: [
      { title: "Software Developer", type: "Full-time", start: "Dec 2023", end: "Present" },
      { title: "Software Developer", type: "Part-time", start: "Feb 2023", end: "Dec 2023" },
    ],
    description:
      "Building software to help people move home. Working across the full stack on web applications and internal tooling.",
  },
  {
    company: "KeyWhere",
    location: "Brisbane, QLD · On-site",
    roles: [
      { title: "Software Engineer Intern", type: "Part-time", start: "Nov 2020", end: "Feb 2023" },
    ],
    description: "Developed features using ASP.NET MVC and Azure DevOps.",
  },
  {
    company: "InspectRealEstate",
    location: "Brisbane, QLD",
    roles: [
      { title: "Engineering Intern", type: "Part-time", start: "Nov 2019", end: "Nov 2020" },
    ],
    description: "Engineering internship contributing to real estate software.",
  },
];

const education = [
  {
    institution: "The University of Queensland",
    degree: "Bachelor of Engineering (Honours), Software Engineering",
    start: "2017",
    end: "2023",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">

      {/* Hero */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Software engineer building reliable web applications and systems.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          Currently working full-time at{" "}
          <span className="text-slate-900 dark:text-slate-100 font-medium">MoveMeIn</span>,
          developing software that helps people manage their move. I hold a Bachelor of
          Engineering (Honours) in Software Engineering from the University of Queensland.
          Based in Brisbane, Australia.
        </p>
        <div className="flex gap-4 text-sm">
          <a
            href="https://github.com/LachieDaly"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lachlan-daly-a70978217"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
          Experience
        </h2>
        <div className="space-y-8">
          {experience.map((job) => (
            <div key={job.company} className="grid sm:grid-cols-[1fr_auto] gap-x-6">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-semibold">{job.company}</h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{job.location}</span>
                </div>
                <div className="space-y-0.5 mb-2">
                  {job.roles.map((role) => (
                    <div
                      key={`${role.title}-${role.start}`}
                      className="flex items-baseline justify-between text-sm"
                    >
                      <span className="text-slate-700 dark:text-slate-300">
                        {role.title}
                        <span className="text-slate-400 dark:text-slate-500 ml-1.5 text-xs">
                          {role.type}
                        </span>
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 ml-4 shrink-0">
                        {role.start} – {role.end}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.institution} className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{edu.degree}</p>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 mt-1">
                {edu.start} – {edu.end}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
