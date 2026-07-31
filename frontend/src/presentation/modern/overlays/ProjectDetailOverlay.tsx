import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'
import { useScrollToStage } from '../hooks/useScrollToStage'

export function ProjectDetailOverlay({ project }: { project: Project | undefined }) {
  const closeDetail = useNarrativeStore((s) => s.closeDetail)
  const scrollToStage = useScrollToStage()
  const [selectedId, setSelectedId] = useState<string | null>(project?.architecture[0]?.id ?? null)

  const handleBackToProjects = () => {
    closeDetail()
    requestAnimationFrame(() => {
      scrollToStage('projects')
    })
  }

  if (!project) return null
  const selected = project.architecture.find((n) => n.id === selectedId) ?? project.architecture[0]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-native-scroll="true"
      className="pointer-events-auto mt-16 mb-6 flex max-h-[calc(100vh-6.5rem)] w-full max-w-5xl flex-col items-stretch gap-4 overflow-y-auto overscroll-contain px-4 pb-6 lg:mt-0 lg:mb-0 lg:max-h-[80vh] lg:flex-row lg:items-start lg:gap-8 lg:px-6 lg:pr-2 lg:pb-0"
    >
      <div className="theme-glass-strong w-full flex-1 rounded-2xl p-5 md:p-6">
        <button
          onClick={handleBackToProjects}
          className="theme-text-faint mb-4 text-xs font-medium hover:text-[rgb(var(--master-text-on-dark)/0.9)]"
        >
          ← Back to projects
        </button>
        <h2 className="theme-text-strong text-3xl font-bold leading-tight">{project.name}</h2>
        <p className="theme-text-muted mt-2 text-lg leading-relaxed">{project.description}</p>

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
                      ? 'border-[rgb(var(--master-primary)/0.65)] bg-[rgb(var(--master-primary)/0.16)] text-[rgb(var(--master-text-on-dark))] shadow-[0_8px_20px_rgb(var(--master-primary)/0.18)]'
                      : 'border-[rgb(var(--master-glass-border)/0.32)] bg-[rgb(var(--master-glass-bg)/0.72)] text-[rgb(var(--master-text-on-dark)/0.9)] hover:border-[rgb(var(--master-primary)/0.4)]'
                  }`}
                >
                  <span className="text-lg font-semibold">{node.name}</span>
                </button>
                {i < arr.length - 1 && (
                  <div className="relative mx-auto h-8 w-px overflow-hidden bg-[rgb(var(--master-glass-border)/0.35)]">
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
            className="theme-glass-strong w-full shrink-0 rounded-2xl p-5 lg:w-80"
          >
            <h3 className="theme-text-strong text-lg font-bold">{selected.name}</h3>
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
