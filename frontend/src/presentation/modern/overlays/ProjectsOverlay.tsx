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
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cyan-300/70">Projects</p>
      <div className="grid max-h-[62vh] grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2">
        {projects.map((project, i) => (
          <motion.button
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px -20px rgba(56,182,255,0.35)' }}
            onClick={() => openProjectDetail(project.id)}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-md transition"
          >
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 6).map((t) => (
                <span key={t} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-200/80">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-white/40">Click to explore architecture →</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
