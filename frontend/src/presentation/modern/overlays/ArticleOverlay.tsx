import { motion } from 'framer-motion'
import type { Article } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'

export function ArticleOverlay({ article }: { article: Article | undefined }) {
  const closeDetail = useNarrativeStore((s) => s.closeDetail)
  if (!article) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="theme-glass pointer-events-auto max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
    >
      <button onClick={closeDetail} className="theme-text-faint mb-4 text-xs hover:text-white/80">
        ← Back to articles
      </button>
      <h2 className="theme-text-strong text-2xl font-semibold">{article.title}</h2>
      <p className="theme-text-faint mt-1 text-xs">{article.publishedAt}</p>
      <p className="theme-text-muted mt-5 text-sm leading-relaxed">{article.content}</p>
    </motion.div>
  )
}
