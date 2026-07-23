import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { LoadingSpinner } from '@presentation/components/shared/LoadingSpinner'
import { ErrorMessage } from '@presentation/components/shared/ErrorMessage'
import { WorkspaceScene } from './scene/WorkspaceScene'
import { StageOverlay } from './overlays/StageOverlay'
import { ProgressNav } from './overlays/ProgressNav'
import { useNarrativeStore, STAGES } from './state/narrativeStore'
import { getStageForProgress } from './state/stageConfig'
import { useMockResumeViewModel } from './data/useMockResumeViewModel'
import { useResumeBackgroundTrack } from './hooks/useResumeBackgroundTrack'

const SCROLL_VH_PER_STAGE = 110

export function ResumeModernPage() {
  const vm = useMockResumeViewModel()
  const scrollSpacerRef = useRef<HTMLDivElement>(null)
  const skills = vm.allSkills
  const [isTrackMuted, setIsTrackMuted] = useState(true)
  const randomDateTimeSeed = useMemo(() => {
    const now = Date.now()
    const randomOffsetMs = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365)
    return new Date(now - randomOffsetMs).toISOString()
  }, [])

  const musicSeed = useMemo(
    () => JSON.stringify({
      profile: vm.profile,
      experiences: vm.experiences,
      skills: vm.skills,
      projects: vm.projects,
      education: vm.education,
      randomDateTime: randomDateTimeSeed,
    }),
    [randomDateTimeSeed, vm.education, vm.experiences, vm.profile, vm.projects, vm.skills],
  )

  useResumeBackgroundTrack(musicSeed, { enabled: true, muted: isTrackMuted })

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
      <button
        type="button"
        onClick={() => setIsTrackMuted((value) => !value)}
        aria-label={isTrackMuted ? 'Turn on background music' : 'Turn off background music'}
        title={isTrackMuted ? 'Music off' : 'Music on'}
        className="pointer-events-auto fixed bottom-5 left-5 z-30 flex items-center gap-3 rounded-full border border-white/15 bg-black/20 px-3 py-2 text-white/90 backdrop-blur-md transition hover:border-white/30 hover:bg-black/35"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8">
          {isTrackMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </span>
        <span className="text-xs font-medium tracking-[0.18em] text-white/75">
          {isTrackMuted ? 'MUSIC OFF' : 'MUSIC ON'}
        </span>
      </button>

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

function VolumeOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10v4h4l5 4V6l-5 4H5Z" />
      <path d="M18 9a5 5 0 0 1 0 6" />
      <path d="M20.5 6.5a8.5 8.5 0 0 1 0 11" />
    </svg>
  )
}

function VolumeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10v4h4l5 4V6l-5 4H5Z" />
      <path d="m18 9 4 6" />
      <path d="m22 9-4 6" />
    </svg>
  )
}
