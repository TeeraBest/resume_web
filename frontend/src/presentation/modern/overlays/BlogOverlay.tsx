import { motion } from 'framer-motion'
import type { Article } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'

export function BlogOverlay({ articles }: { articles: Article[] }) {
  const openArticle = useNarrativeStore((s) => s.openArticle)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto w-full max-w-2xl px-6"
    >
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-cyan-300/70">Blog</p>
      <div className="grid max-h-[60vh] gap-3 overflow-y-auto pr-1">
        {articles.map((article, i) => (
          <motion.button
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onClick={() => openArticle(article.slug)}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-md transition hover:border-white/25"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold text-white">{article.title}</h3>
              <span className="shrink-0 text-xs text-white/40">{article.publishedAt}</span>
            </div>
            <p className="mt-2 text-sm text-white/60">{article.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <span key={t} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-[11px] text-cyan-200/80">
                  #{t}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
