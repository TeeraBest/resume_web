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
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">Skills</p>
      <p className="mt-3 text-sm text-white/50">Click a glowing key to explore a technology</p>
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
      className="pointer-events-auto w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
    >
      <button onClick={closeDetail} className="mb-4 text-xs text-white/50 hover:text-white/80">
        ← Back to keyboard
      </button>
      <h2 className="text-xl font-semibold text-white">{skill.name}</h2>
      <p className="mt-1 text-sm text-cyan-300/80">{LEVEL_LABEL[skill.level]}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
        <div className="rounded-xl border border-white/10 bg-white/5 py-3">
          <p className="text-2xl font-semibold text-white">{skill.yearsOfExperience ?? '—'}</p>
          <p className="text-[11px] text-white/40">years</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 py-3">
          <p className="text-2xl font-semibold text-white">{skill.projectsCount ?? '—'}</p>
          <p className="text-[11px] text-white/40">projects</p>
        </div>
      </div>

      {skill.description && <p className="mt-4 text-sm leading-relaxed text-white/60">{skill.description}</p>}
    </motion.div>
  )
}
