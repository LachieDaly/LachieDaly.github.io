const experience = [
  {
    company: "MoveMeIn",
    location: "Brisbane, QLD · Hybrid",
    roles: [
      {
        title: "Software Developer",
        type: "Full-time",
        start: "Dec 2023",
        end: "Present",
      },
      {
        title: "Software Developer",
        type: "Part-time",
        start: "Feb 2023",
        end: "Dec 2023",
      },
    ],
    description:
      "Building software to help people move home. Working across the full stack on web applications and internal tooling.",
  },
  {
    company: "KeyWhere",
    location: "Brisbane, QLD · On-site",
    roles: [
      {
        title: "Software Engineer Intern",
        type: "Part-time",
        start: "Nov 2020",
        end: "Feb 2023",
      },
    ],
    description: "Developed features using ASP.NET MVC and Azure DevOps.",
  },
  {
    company: "InspectRealEstate",
    location: "Brisbane, QLD",
    roles: [
      {
        title: "Engineering Intern",
        type: "Part-time",
        start: "Nov 2019",
        end: "Nov 2020",
      },
    ],
    description: "Engineering internship contributing to real estate software.",
  },
];

const education = [
  {
    institution: "The University of Queensland",
    degree: "Bachelor of Engineering (Honours)",
    field: "Software Engineering",
    start: "2017",
    end: "2023",
  },
];

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">
          Software Engineer · Brisbane, Australia
        </p>
        <p className="leading-relaxed max-w-2xl">
          I build reliable systems, tools, and web applications. Currently working
          full-time at MoveMeIn, where I help develop software that makes moving
          home easier. I hold a Bachelor of Engineering (Honours) in Software
          Engineering from the University of Queensland.
        </p>
        <div className="flex gap-5 mt-5 text-sm">
          <a
            href="https://github.com/LachieDaly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lachlan-daly-a70978217"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Experience</h2>
        <div className="space-y-8">
          {experience.map((job) => (
            <div key={job.company}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="font-semibold text-base">{job.company}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {job.location}
                </span>
              </div>
              <div className="space-y-1 mb-2">
                {job.roles.map((role) => (
                  <div
                    key={`${role.title}-${role.start}`}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {role.title}
                      <span className="text-gray-400 dark:text-gray-500 ml-2">
                        {role.type}
                      </span>
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {role.start} – {role.end}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.institution}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-semibold text-base">{edu.institution}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.start} – {edu.end}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {edu.degree}, {edu.field}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
