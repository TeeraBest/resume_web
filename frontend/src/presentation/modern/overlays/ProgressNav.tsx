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

  return (
    <div className="pointer-events-auto fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {NAV_ITEMS.map((item) => {
        const isActive = stage === item.target || stage === `post-${item.target}`

        return (
          <button
            key={item.key}
            onClick={() => scrollToStage(item.target)}
            title={item.target}
            className={`h-2.5 w-2.5 rounded-full border transition-all ${
              isActive ? 'scale-125 border-cyan-300 bg-cyan-300' : 'border-white/30 bg-transparent hover:border-white/60'
            }`}
          />
        )
      })}
    </div>
  )
}
