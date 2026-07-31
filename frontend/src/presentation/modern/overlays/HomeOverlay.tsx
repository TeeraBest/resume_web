import { motion } from 'framer-motion'
import type { Profile } from '@core/models/resume.model'

export function HomeOverlay({ profile }: { profile: Profile | null }) {

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
      </div>
    </motion.div>
  )
}
