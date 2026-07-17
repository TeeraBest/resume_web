import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Profile } from '@core/models/resume.model'

export function ContactOverlay({ profile }: { profile: Profile | null }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto w-full max-w-md px-6"
    >
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cyan-300/70">Contact</p>

      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <button
              onClick={() => setShowForm(true)}
              className="block w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-left text-sm text-white/80 backdrop-blur-md transition hover:border-cyan-400/50"
            >
              ✉️ {profile?.email ?? 'Email'}
            </button>
            {profile?.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur-md transition hover:border-cyan-400/50"
              >
                🔗 LinkedIn
              </a>
            )}
            {profile?.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur-md transition hover:border-cyan-400/50"
              >
                🐙 GitHub
              </a>
            )}
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full rounded-xl bg-cyan-500/90 px-5 py-3 text-center text-sm font-medium text-black transition hover:bg-cyan-400"
              >
                Download Resume
              </a>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, rotateX: -10 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault()
              window.location.href = `mailto:${profile?.email ?? ''}`
            }}
            className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
          >
            <button type="button" onClick={() => setShowForm(false)} className="text-xs text-white/50 hover:text-white/80">
              ← Back
            </button>
            <input
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
            />
            <textarea
              required
              placeholder="Message"
              rows={4}
              className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none"
            />
            <button type="submit" className="w-full rounded-lg bg-cyan-500/90 py-2.5 text-sm font-medium text-black hover:bg-cyan-400">
              Send
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
