import { motion } from 'framer-motion'
import type { Experience } from '@core/models/resume.model'

export function ExperienceOverlay({ experiences }: { experiences: Experience[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto w-full max-w-3xl px-6"
    >
      <h2 className="theme-kicker mb-6 text-center text-2xl font-extrabold uppercase tracking-[0.18em] md:text-3xl">
        Experience
      </h2>
      <div className="grid max-h-[60vh] gap-4 overflow-y-auto pr-1">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="theme-glass rounded-2xl p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="theme-text-strong text-lg font-semibold">{exp.company}</h3>
              <span className="theme-text-faint text-xs">
                {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="theme-kicker mt-1 text-sm">{exp.position}</p>
            <p className="theme-text-muted mt-3 text-sm leading-relaxed">{exp.description}</p>
            {exp.highlights.length > 0 && (
              <ul className="theme-text-faint mt-3 space-y-1 text-sm">
                {exp.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="theme-kicker">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
