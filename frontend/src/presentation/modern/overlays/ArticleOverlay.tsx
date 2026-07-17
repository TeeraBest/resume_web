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
      className="pointer-events-auto max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md"
    >
      <button onClick={closeDetail} className="mb-4 text-xs text-white/50 hover:text-white/80">
        ← Back to articles
      </button>
      <h2 className="text-2xl font-semibold text-white">{article.title}</h2>
      <p className="mt-1 text-xs text-white/40">{article.publishedAt}</p>
      <p className="mt-5 text-sm leading-relaxed text-white/70">{article.content}</p>
    </motion.div>
  )
}
