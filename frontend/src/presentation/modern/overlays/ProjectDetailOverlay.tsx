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
      className="pointer-events-auto flex w-full max-w-5xl items-start gap-8 px-6"
    >
      <div className="flex-1">
        <button onClick={closeDetail} className="mb-4 text-xs text-white/50 hover:text-white/80">
          ← Back to projects
        </button>
        <h2 className="text-2xl font-semibold text-white">{project.name}</h2>
        <p className="mt-1 text-sm text-white/50">{project.description}</p>

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
                      ? 'border-cyan-400/60 bg-cyan-400/10 text-white'
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
            className="w-80 shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
          >
            <h3 className="text-base font-semibold text-white">{selected.name}</h3>
            <DetailList title="Responsibilities" items={selected.responsibilities} />
            <DetailList title="Challenges" items={selected.challenges} />
            <DetailList title="Solutions" items={selected.solutions} />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selected.technologies.map((t) => (
                <span key={t} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-200/80">
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
          background: #4fd6ff;
          box-shadow: 0 0 8px 2px rgba(79,214,255,0.8);
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
      <p className="text-[11px] uppercase tracking-wider text-white/40">{title}</p>
      <ul className="mt-1.5 space-y-1 text-sm text-white/60">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-cyan-400/70">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
