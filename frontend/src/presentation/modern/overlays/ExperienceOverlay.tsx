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
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cyan-300/70">Experience</p>
      <div className="grid max-h-[60vh] gap-4 overflow-y-auto pr-1">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
              <span className="text-xs text-white/40">
                {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="mt-1 text-sm text-cyan-300/80">{exp.position}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{exp.description}</p>
            {exp.highlights.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-white/50">
                {exp.highlights.map((h, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-cyan-400/70">•</span>
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
