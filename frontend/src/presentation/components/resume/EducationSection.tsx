import type { Education } from '@core/models/resume.model'

interface Props {
  education: Education[]
}

export function EducationSection({ education }: Props) {
  if (education.length === 0) return null

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Education
      </h2>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{edu.institution}</h3>
              <p className="text-brand-600 font-medium">
                {edu.degree} in {edu.field}
              </p>
              {edu.gpa && (
                <p className="text-sm text-gray-500 mt-0.5">GPA: {edu.gpa}</p>
              )}
              {edu.description && (
                <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
              )}
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-sm text-gray-500">
                {new Date(edu.startDate).getFullYear()} —{' '}
                {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
