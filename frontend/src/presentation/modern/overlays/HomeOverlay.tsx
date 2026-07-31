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
      <h2 className="theme-kicker mb-4 text-2xl font-extrabold uppercase tracking-[0.18em] md:text-3xl">Welcome</h2>
      <h1 className="theme-text-strong text-4xl font-semibold md:text-5xl">I'm {profile?.fullName ?? 'Loading...'}</h1>
      <p className="theme-text-muted mt-3 text-lg">{profile?.title}</p>
      <p className="theme-text-faint mt-6 text-sm leading-relaxed">{profile?.summary}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      </div>
    </motion.div>
  )
}
