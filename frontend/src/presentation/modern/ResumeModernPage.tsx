import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { LoadingSpinner } from '@presentation/components/shared/LoadingSpinner'
import { ErrorMessage } from '@presentation/components/shared/ErrorMessage'
import { WorkspaceScene } from './scene/WorkspaceScene'
import { StageOverlay } from './overlays/StageOverlay'
import { ProgressNav } from './overlays/ProgressNav'
import { useNarrativeStore, STAGES } from './state/narrativeStore'
import { getStageForProgress } from './state/stageConfig'
import { useMockResumeViewModel } from './data/useMockResumeViewModel'

const SCROLL_VH_PER_STAGE = 110

export function ResumeModernPage() {
  const vm = useMockResumeViewModel()
  const scrollSpacerRef = useRef<HTMLDivElement>(null)
  const skills = vm.allSkills

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollHeight)) : 0

      const store = useNarrativeStore.getState()
      store.setProgress(progress)

      const stage = getStageForProgress(progress)
      if (stage !== store.stage) store.setStage(stage)
      if (progress > 0.001 && !store.hasStarted) store.markStarted()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (vm.isLoading) return <LoadingSpinner />

  if (vm.isError) {
    return (
      <ErrorMessage
        message={vm.error?.message ?? 'Could not load resume data. Make sure the API is running.'}
        onRetry={() => vm.refetch()}
      />
    )
  }

  return (
    <div className="relative bg-[#02040a]">
      {/* Fixed 3D + overlay layer */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 1.6]}
          camera={{ position: [0, 26, 95], fov: 42, near: 0.1, far: 1000 }}
          gl={{ toneMappingExposure: 1.35 }}
        >
          <WorkspaceScene profile={vm.profile} skills={skills} />
        </Canvas>
      </div>

      <StageOverlay
        profile={vm.profile}
        experiences={vm.experiences}
        projects={vm.projects}
        skills={skills}
        articles={vm.articles}
      />
      <ProgressNav />

      {/* Scroll spacer drives the whole narrative — the fixed layer above reads window scroll */}
      <div ref={scrollSpacerRef} style={{ height: `${STAGES.length * SCROLL_VH_PER_STAGE}vh` }} />
    </div>
  )
}
