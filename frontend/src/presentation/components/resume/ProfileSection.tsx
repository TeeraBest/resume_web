import type { Profile } from '@core/models/resume.model'

interface Props {
  profile: Profile
  yearsOfExperience: number
}

export function ProfileSection({ profile, yearsOfExperience }: Props) {
  return (
    <section className="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center text-3xl font-bold flex-shrink-0">
            {profile.fullName.charAt(0)}
          </div>

          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-1">{profile.fullName}</h1>
            <p className="text-brand-100 text-xl mb-4">{profile.title}</p>
            <p className="text-brand-200 leading-relaxed max-w-2xl">{profile.summary}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-sm text-brand-200">
          {profile.location && (
            <span className="flex items-center gap-1">
              <span>📍</span> {profile.location}
            </span>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <span>✉️</span> {profile.email}
            </a>
          )}
          {profile.phone && (
            <span className="flex items-center gap-1">
              <span>📞</span> {profile.phone}
            </span>
          )}
          <span className="flex items-center gap-1">
            <span>⏱️</span> {yearsOfExperience}+ years of experience
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          {profile.links.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              LinkedIn →
            </a>
          )}
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              GitHub →
            </a>
          )}
          {profile.links.website && (
            <a
              href={profile.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              Website →
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
