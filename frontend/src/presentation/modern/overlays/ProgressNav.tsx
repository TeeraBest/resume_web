import { STAGES } from '../state/narrativeStore'
import { useNarrativeStore } from '../state/narrativeStore'
import { useScrollToStage } from '../hooks/useScrollToStage'

const VISIBLE_STAGES = STAGES.filter((s) => s !== 'intro' && s !== 'laptopOpen' && s !== 'enterLaptop')

export function ProgressNav() {
  const stage = useNarrativeStore((s) => s.stage)
  const scrollToStage = useScrollToStage()

  return (
    <div className="pointer-events-auto fixed right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {VISIBLE_STAGES.map((s) => (
        <button
          key={s}
          onClick={() => scrollToStage(s)}
          title={s}
          className={`h-2.5 w-2.5 rounded-full border transition-all ${
            stage === s ? 'scale-125 border-cyan-300 bg-cyan-300' : 'border-white/30 bg-transparent hover:border-white/60'
          }`}
        />
      ))}
    </div>
  )
}
