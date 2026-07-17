import { useCallback } from 'react'
import { getStageRange } from '../state/stageConfig'
import type { StageId } from '../state/narrativeStore'

/** Smoothly scrolls the page so the given narrative stage becomes active. */
export function useScrollToStage() {
  return useCallback((stage: StageId) => {
    const [start] = getStageRange(stage)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: start * scrollHeight + 4, behavior: 'smooth' })
  }, [])
}
