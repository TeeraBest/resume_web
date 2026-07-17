import type { Experience } from '@core/models/resume.model'

interface Props {
  experiences: Experience[]
}

function formatDateRange(startDate: string, endDate: string | null, isCurrent: boolean): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${fmt(startDate)} — ${isCurrent ? 'Present' : endDate ? fmt(endDate) : ''}`
}

export function ExperienceSection({ experiences }: Props) {
  if (experiences.length === 0) return null

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Work Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-6 border-l-2 border-brand-200">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-white" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <p className="text-brand-600 font-medium">{exp.company}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-sm text-gray-500">
                  {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                </span>
                {exp.location && (
                  <p className="text-xs text-gray-400 mt-0.5">{exp.location}</p>
                )}
              </div>
            </div>

            {exp.isCurrent && (
              <span className="inline-block mb-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                Current
              </span>
            )}

            <p className="text-gray-600 text-sm leading-relaxed mb-3">{exp.description}</p>

            {exp.highlights.length > 0 && (
              <ul className="space-y-1">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span className="text-brand-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
