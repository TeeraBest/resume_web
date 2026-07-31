import { motion } from 'framer-motion'
import type { Project } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'

export function ProjectsOverlay({ projects }: { projects: Project[] }) {
  const openProjectDetail = useNarrativeStore((s) => s.openProjectDetail)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto w-full max-w-4xl px-6"
    >
      <h2 className="theme-kicker mb-6 text-center text-2xl font-extrabold uppercase tracking-[0.18em] md:text-3xl">
        Projects
      </h2>
      <div data-native-scroll="true" className="grid max-h-[62vh] grid-cols-1 gap-4 overflow-y-auto overscroll-contain pr-1 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -20px rgba(56,182,255,0.35)' }}
            onClick={() => openProjectDetail(project.id)}
            className="theme-glass rounded-2xl p-5 text-left transition"
          >
            <h3 className="theme-text-strong text-xl font-bold tracking-tight md:text-2xl">{project.name}</h3>
            <p className="theme-text-muted mt-2 text-base leading-relaxed">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((t) => (
                <span key={t} className="theme-chip rounded-full px-2.5 py-1 text-[11px]">
                  {t}
                </span>
              ))}
            </div>
            <p className="theme-text-faint mt-3 text-sm font-medium">Click to explore architecture →</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
