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
      <h2 className="theme-kicker mb-6 text-center text-2xl font-extrabold uppercase tracking-[0.18em] md:text-3xl">
        Blog
      </h2>
      <div data-native-scroll="true" className="grid max-h-[60vh] gap-3 overflow-y-auto overscroll-contain pr-1">
        {articles.map((article, i) => (
          <motion.button
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            onClick={() => openArticle(article.slug)}
            className="theme-glass rounded-2xl p-5 text-left transition hover:border-white/25"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="theme-text-strong text-base font-semibold">{article.title}</h3>
              <span className="theme-text-faint shrink-0 text-xs">{article.publishedAt}</span>
            </div>
            <p className="theme-text-muted mt-2 text-sm">{article.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <span key={t} className="theme-chip rounded-full px-2.5 py-1 text-[11px]">
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
