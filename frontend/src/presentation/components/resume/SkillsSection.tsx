import type { SkillCategory } from '@core/models/resume.model'

interface Props {
  categories: SkillCategory[]
}

const levelColor: Record<string, string> = {
  BEGINNER: 'bg-gray-200 text-gray-700',
  INTERMEDIATE: 'bg-blue-100 text-blue-700',
  ADVANCED: 'bg-brand-100 text-brand-700',
  EXPERT: 'bg-brand-600 text-white',
}

const levelWidth: Record<string, string> = {
  BEGINNER: 'w-1/4',
  INTERMEDIATE: 'w-2/4',
  ADVANCED: 'w-3/4',
  EXPERT: 'w-full',
}

export function SkillsSection({ categories }: Props) {
  if (categories.length === 0) return null

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div key={cat.name}>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {cat.name}
            </h3>
            <div className="space-y-2">
              {cat.skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[skill.level]}`}>
                      {skill.level.charAt(0) + skill.level.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-brand-500 rounded-full ${levelWidth[skill.level]}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
