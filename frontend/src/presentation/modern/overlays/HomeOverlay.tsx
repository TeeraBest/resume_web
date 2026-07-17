import { motion } from 'framer-motion'
import type { Profile } from '@core/models/resume.model'
import { useScrollToStage } from '../hooks/useScrollToStage'

export function HomeOverlay({ profile }: { profile: Profile | null }) {
  const scrollToStage = useScrollToStage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto max-w-xl px-8 text-center"
    >
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300/70">Welcome</p>
      <h1 className="text-4xl md:text-5xl font-semibold text-white">{profile?.fullName ?? 'Loading...'}</h1>
      <p className="mt-3 text-lg text-white/60">{profile?.title}</p>
      <p className="mt-6 text-sm leading-relaxed text-white/50">{profile?.summary}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => scrollToStage('projects')}
          className="rounded-full bg-cyan-500/90 px-6 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-400"
        >
          View Projects
        </button>
        <button
          onClick={() => scrollToStage('experience')}
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/40"
        >
          Experience
        </button>
        <button
          onClick={() => scrollToStage('contact')}
          className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/40"
        >
          Contact
        </button>
      </div>
    </motion.div>
  )
}
