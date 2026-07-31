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
      <h2 className="theme-kicker mb-6 text-center text-2xl font-extrabold uppercase tracking-[0.18em] md:text-3xl">
        Contact
      </h2>

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
              className="theme-glass theme-text-strong block w-full rounded-xl px-5 py-3 text-left text-base font-medium transition hover:border-[rgb(var(--master-primary)/0.5)]"
            >
              ✉️ {profile?.email ?? 'Email'}
            </button>
            {profile?.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="theme-glass theme-text-strong block w-full rounded-xl px-5 py-3 text-base font-medium transition hover:border-[rgb(var(--master-primary)/0.5)]"
              >
                🔗 LinkedIn
              </a>
            )}
            {profile?.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="theme-glass theme-text-strong block w-full rounded-xl px-5 py-3 text-base font-medium transition hover:border-[rgb(var(--master-primary)/0.5)]"
              >
                🐙 GitHub
              </a>
            )}
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="theme-action block w-full rounded-xl px-5 py-3 text-center text-sm font-medium transition"
              >
                Download Résumé
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
            className="theme-glass space-y-3 rounded-2xl p-5"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="theme-text-faint text-xs hover:text-[rgb(var(--master-text-on-dark)/0.88)]"
            >
              ← Back
            </button>
            <input
              required
              placeholder="Your name"
              className="theme-input w-full rounded-lg px-3 py-2 text-sm"
            />
            <input
              required
              type="email"
              placeholder="Your email"
              className="theme-input w-full rounded-lg px-3 py-2 text-sm"
            />
            <textarea
              required
              placeholder="Message"
              rows={4}
              className="theme-input w-full resize-none rounded-lg px-3 py-2 text-sm"
            />
            <button type="submit" className="theme-action w-full rounded-lg py-2.5 text-sm font-medium">
              Send
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
