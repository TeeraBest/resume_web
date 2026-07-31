import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'

export function ProjectDetailOverlay({ project }: { project: Project | undefined }) {
  const closeDetail = useNarrativeStore((s) => s.closeDetail)
  const [selectedId, setSelectedId] = useState<string | null>(project?.architecture[0]?.id ?? null)

  if (!project) return null
  const selected = project.architecture.find((n) => n.id === selectedId) ?? project.architecture[0]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto flex max-h-[80vh] w-full max-w-5xl items-start gap-8 overflow-y-auto px-6 pr-2"
    >
      <div className="flex-1">
        <button onClick={closeDetail} className="theme-text-faint mb-4 text-xs hover:text-white/80">
          ← Back to projects
        </button>
        <h2 className="theme-text-strong text-2xl font-semibold">{project.name}</h2>
        <p className="theme-text-faint mt-1 text-sm">{project.description}</p>

        <div className="mt-8 flex flex-col items-stretch">
          {project.architecture
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((node, i, arr) => (
              <div key={node.id}>
                <button
                  onClick={() => setSelectedId(node.id)}
                  className={`w-full rounded-xl border px-5 py-3 text-left transition ${
                    selected?.id === node.id
                      ? 'border-[rgb(var(--master-primary)/0.6)] bg-[rgb(var(--master-primary)/0.1)] text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25'
                  }`}
                >
                  <span className="text-sm font-medium">{node.name}</span>
                </button>
                {i < arr.length - 1 && (
                  <div className="relative mx-auto h-8 w-px overflow-hidden bg-white/10">
                    <span className="packet-dot" />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="theme-glass w-80 shrink-0 rounded-2xl p-5"
          >
            <h3 className="theme-text-strong text-base font-semibold">{selected.name}</h3>
            <DetailList title="Responsibilities" items={selected.responsibilities} />
            <DetailList title="Challenges" items={selected.challenges} />
            <DetailList title="Solutions" items={selected.solutions} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selected.technologies.map((t) => (
                <span key={t} className="theme-chip rounded-full px-2.5 py-1 text-[11px]">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .packet-dot {
          position: absolute;
          left: 50%;
          top: -8px;
          width: 6px;
          height: 6px;
          margin-left: -3px;
          border-radius: 9999px;
          background: rgb(var(--master-primary));
          box-shadow: 0 0 8px 2px rgb(var(--master-primary) / 0.8);
          animation: packet-flow 1.4s linear infinite;
        }
        @keyframes packet-flow {
          0% { top: -8px; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </motion.div>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div className="mt-3">
      <p className="theme-text-faint text-[11px] uppercase tracking-wider">{title}</p>
      <ul className="theme-text-muted mt-1.5 space-y-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="theme-kicker">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
