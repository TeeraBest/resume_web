import type { Project } from '@core/models/resume.model'

interface Props {
  projects: Project[]
}

export function ProjectsSection({ projects }: Props) {
  if (projects.length === 0) return null

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-gray-900">{proj.name}</h3>
              <div className="flex gap-2 flex-shrink-0">
                {proj.links.github && (
                  <a
                    href={proj.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-brand-600 transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {proj.links.url && (
                  <a
                    href={proj.links.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-brand-600 transition-colors"
                  >
                    Demo →
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-3">{proj.description}</p>

            {proj.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {proj.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
