import { motion } from 'framer-motion'
import type { Skill } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'

export function SkillsHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none px-6 text-center"
    >
      <h2 className="theme-kicker text-2xl font-extrabold uppercase tracking-[0.18em] md:text-3xl">Skills</h2>
      <p className="theme-text-faint mt-3 text-sm">Click a glowing key to explore a technology</p>
    </motion.div>
  )
}

const LEVEL_LABEL: Record<Skill['level'], string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert',
}

export function SkillDetailOverlay({ skill }: { skill: Skill | undefined }) {
  const closeDetail = useNarrativeStore((s) => s.closeDetail)
  if (!skill) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="theme-glass pointer-events-auto w-full max-w-sm rounded-2xl p-6"
    >
      <button onClick={closeDetail} className="theme-text-faint mb-4 text-xs hover:text-white/80">
        ← Back to keyboard
      </button>
      <h2 className="theme-text-strong text-xl font-semibold">{skill.name}</h2>
      <p className="theme-kicker mt-1 text-sm">{LEVEL_LABEL[skill.level]}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="theme-glass rounded-xl py-3">
          <p className="theme-text-strong text-2xl font-semibold">{skill.yearsOfExperience ?? '—'}</p>
          <p className="theme-text-faint text-[11px]">years</p>
        </div>
        <div className="theme-glass rounded-xl py-3">
          <p className="theme-text-strong text-2xl font-semibold">{skill.projectsCount ?? '—'}</p>
          <p className="theme-text-faint text-[11px]">projects</p>
        </div>
      </div>

      {skill.description && <p className="theme-text-muted mt-4 text-sm leading-relaxed">{skill.description}</p>}
    </motion.div>
  )
}
