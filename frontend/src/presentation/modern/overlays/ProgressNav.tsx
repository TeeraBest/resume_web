import { useNarrativeStore, type StageId } from '../state/narrativeStore'
import { useScrollToStage } from '../hooks/useScrollToStage'

const NAV_ITEMS: Array<{ key: string; target: StageId }> = [
  { key: 'home', target: 'home' },
  { key: 'experience', target: 'experience' },
  { key: 'projects', target: 'projects' },
  { key: 'skills', target: 'skills' },
  { key: 'blog', target: 'blog' },
  { key: 'contact', target: 'contact' },
  { key: 'ending', target: 'ending' },
]

export function ProgressNav() {
  const stage = useNarrativeStore((s) => s.stage)
  const scrollToStage = useScrollToStage()
  const activeIndex = NAV_ITEMS.findIndex((item) => stage === item.target || stage === `post-${item.target}`)
  const currentIndex = activeIndex >= 0 ? activeIndex : 0

  const goToRelativeStage = (delta: number) => {
    const total = NAV_ITEMS.length
    const nextIndex = (currentIndex + delta + total) % total
    scrollToStage(NAV_ITEMS[nextIndex].target)
  }

  return (
    <div className="theme-control-shell pointer-events-auto fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-5 rounded-full px-4 py-2.5 shadow-[0_10px_38px_rgba(0,0,0,0.24)]">
      <button
        type="button"
        onClick={() => goToRelativeStage(-1)}
        aria-label="Go to previous section"
        title="Previous"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--master-control-border)/0.42)] bg-[rgb(var(--master-control-surface-hover)/0.95)] text-[rgb(var(--master-control-text))] transition hover:border-[rgb(var(--master-control-border)/0.62)] hover:bg-[rgb(var(--master-control-surface-hover))]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="M14.8 5.8 7.8 12l7 6.2V5.8Z" />
        </svg>
      </button>

      <div className="flex items-center gap-2.5">
        {NAV_ITEMS.map((item) => {
          const isActive = stage === item.target || stage === `post-${item.target}`

          return (
            <button
              key={item.key}
              onClick={() => scrollToStage(item.target)}
              title={item.target}
              aria-label={`Go to ${item.target}`}
              className={`rounded-full border transition-all ${
                isActive
                  ? 'h-2.5 w-8 border-[rgb(var(--master-success)/0.95)] bg-[rgb(var(--master-success))] shadow-[0_0_16px_rgb(var(--master-success)/0.55)]'
                  : 'h-2.5 w-2.5 border-[rgb(var(--master-control-border)/0.4)] bg-[rgb(var(--master-control-text)/0.28)] hover:bg-[rgb(var(--master-control-text)/0.48)]'
              }`}
            />
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => goToRelativeStage(1)}
        aria-label="Go to next section"
        title="Next"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(var(--master-control-border)/0.42)] bg-[rgb(var(--master-control-surface-hover)/0.95)] text-[rgb(var(--master-control-text))] transition hover:border-[rgb(var(--master-control-border)/0.62)] hover:bg-[rgb(var(--master-control-surface-hover))]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
          <path d="m9.2 5.8 7 6.2-7 6.2V5.8Z" />
        </svg>
      </button>
    </div>
  )
}
