import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { LoadingSpinner } from '@presentation/components/shared/LoadingSpinner'
import { ErrorMessage } from '@presentation/components/shared/ErrorMessage'
import { WorkspaceScene } from './scene/WorkspaceScene'
import { StageOverlay } from './overlays/StageOverlay'
import { ProgressNav } from './overlays/ProgressNav'
import { useNarrativeStore, STAGES } from './state/narrativeStore'
import { getStageForProgress } from './state/stageConfig'
import { useMockResumeViewModel } from './data/useMockResumeViewModel'
import { useYoutubeBackgroundTrack } from './hooks/useYoutubeBackgroundTrack.ts'
import { getThemeFromDom, THEMES } from './theme/theme.config'

const SCROLL_VH_PER_STAGE = 110

export function ResumeModernPage() {
  const vm = useMockResumeViewModel()
  const scrollSpacerRef = useRef<HTMLDivElement>(null)
  const scrollOffsetRef = useRef(0)
  const maxScrollDistanceRef = useRef(0)
  const touchStartYRef = useRef<number | null>(null)
  const touchPrevYRef = useRef<number | null>(null)
  const navigate = useNavigate()
  const detail = useNarrativeStore((s) => s.detail)
  const [showResumePaper, setShowResumePaper] = useState(false)
  const [showResumePaperDialog, setShowResumePaperDialog] = useState(false)
  const [resumePaperMessage, setResumePaperMessage] = useState('')
  const skills = vm.allSkills
  const [isTrackMuted, setIsTrackMuted] = useState(true)
  const [hasActivatedMusic, setHasActivatedMusic] = useState(false)
  const isLoveTheme = getThemeFromDom() === THEMES.MY_LOVE_ENG
  const youtubeMusicVideoId =
    isLoveTheme
      ? 'kPhpHvnnn0Q'
      : import.meta.env.VITE_YOUTUBE_MUSIC_VIDEO_ID?.trim() || '8b3fqIBrNW0'
  const youtubeStartPercent = useMemo(() => (isLoveTheme ? 0 : 0.02 + Math.random() * 0.78), [isLoveTheme])
  const enableShadows = useMemo(() => {
    if (typeof window === 'undefined') return true
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isSmallViewport = window.innerWidth < 900
    return !(isCoarsePointer || isSmallViewport)
  }, [])

  // Local procedural track stays as fallback while YouTube player is wired in.
  // useResumeBackgroundTrack(musicSeed, { enabled: true, muted: isTrackMuted })
  useYoutubeBackgroundTrack({
    enabled: Boolean(youtubeMusicVideoId) && hasActivatedMusic,
    muted: isTrackMuted,
    videoId: youtubeMusicVideoId ?? '',
    volume: 15,
    startPercent: youtubeStartPercent,
  })
  

  const resumePaperMessages =
    getThemeFromDom() === THEMES.MY_LOVE_ENG
      ? ['I Love you so much. Please forgive me 🥰']
      : [
          'I have the paper version as well. No worryyy',
          // 'Paper version is here.',
          // 'Love it right? , you can also see my details here too',
        ]

  useEffect(() => {
    const showButtonTimer = window.setTimeout(() => {
      setShowResumePaper(true)
    }, 1_000)

    const showDialogTimer = window.setTimeout(() => {
      setResumePaperMessage(resumePaperMessages[Math.floor(Math.random() * resumePaperMessages.length)])
      setShowResumePaperDialog(true)
    }, 2_000)

    const hideDialogTimer = window.setTimeout(() => {
      setShowResumePaperDialog(false)
    }, 10_000)

    return () => {
      window.clearTimeout(showButtonTimer)
      window.clearTimeout(showDialogTimer)
      window.clearTimeout(hideDialogTimer)
    }
  }, [])

  useEffect(() => {
    const getNativeScrollContainer = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null
      return target.closest('[data-native-scroll="true"]') as HTMLElement | null
    }

    const canNativeScroll = (container: HTMLElement, delta: number) => {
      if (delta === 0) return false

      const maxScrollTop = container.scrollHeight - container.clientHeight
      if (maxScrollTop <= 0) return false

      const epsilon = 1
      if (delta > 0) {
        return container.scrollTop < maxScrollTop - epsilon
      }

      return container.scrollTop > epsilon
    }

    const syncNarrativeProgress = (offset: number, maxScrollDistance: number) => {
      const progress = maxScrollDistance > 0 ? Math.min(1, Math.max(0, offset / maxScrollDistance)) : 0

      const store = useNarrativeStore.getState()
      store.setProgress(progress)

      const stage = getStageForProgress(progress)
      if (stage !== store.stage) store.setStage(stage)
      if (progress > 0.001 && !store.hasStarted) store.markStarted()
    }

    const handleScroll = () => {
      const maxScrollDistance = maxScrollDistanceRef.current
      const offset = maxScrollDistance > 0 ? Math.min(maxScrollDistance, Math.max(0, window.scrollY)) : 0
      scrollOffsetRef.current = offset
      syncNarrativeProgress(offset, maxScrollDistance)
    }

    const handleWheel = (event: WheelEvent) => {
      const nativeScrollContainer = getNativeScrollContainer(event.target)
      if (nativeScrollContainer && canNativeScroll(nativeScrollContainer, event.deltaY)) return

      if (detail === 'projectDetail') {
        event.preventDefault()
        return
      }

      const maxScrollDistance = maxScrollDistanceRef.current
      if (maxScrollDistance <= 0) return

      if (event.deltaY > 0) {
        event.preventDefault()
        const nextOffset = scrollOffsetRef.current + Math.max(7.5, Math.abs(event.deltaY) * 0.3)
        scrollOffsetRef.current = nextOffset >= maxScrollDistance ? nextOffset % maxScrollDistance : nextOffset
        window.scrollTo(0, scrollOffsetRef.current)
      } 
      // else if (event.deltaY < 0) {
      //   event.preventDefault()
      // }
    }

    const handleTouchStart = (event: TouchEvent) => {
      const t = event.touches[0]
      touchStartYRef.current = t?.clientY ?? null
      touchPrevYRef.current = t?.clientY ?? null
    }

    const handleTouchMove = (event: TouchEvent) => {
      const maxScrollDistance = maxScrollDistanceRef.current
      if (maxScrollDistance <= 0) return

      const touch = event.touches[0]
      if (!touch) return

      const y = touch.clientY
      const prev = touchPrevYRef.current ?? y
      const delta = prev - y
      touchPrevYRef.current = y

      const nativeScrollContainer = getNativeScrollContainer(event.target)
      if (nativeScrollContainer && canNativeScroll(nativeScrollContainer, delta)) return

      if (detail === 'projectDetail') {
        if (event.cancelable) event.preventDefault()
        return
      }

      // delta > 0 means user moved finger up => advance forward
      if (delta > 0) {
        if (event.cancelable) event.preventDefault()
        const nextOffset = scrollOffsetRef.current + Math.max(7.5, Math.abs(delta) * 0.8)
        scrollOffsetRef.current = nextOffset >= maxScrollDistance ? nextOffset % maxScrollDistance : nextOffset
        window.scrollTo(0, scrollOffsetRef.current)
      } else {
        // Prevent backward scrolling on mobile as well
        // event.preventDefault()
      }
    }

    const handleTouchEnd = () => {
      touchStartYRef.current = null
      touchPrevYRef.current = null
    }

    const updateScrollBounds = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      maxScrollDistanceRef.current = Math.max(0, scrollHeight)
      if (maxScrollDistanceRef.current <= 0) {
        scrollOffsetRef.current = 0
        syncNarrativeProgress(0, 0)
        return
      }

      if (scrollOffsetRef.current > maxScrollDistanceRef.current) {
        scrollOffsetRef.current = scrollOffsetRef.current % maxScrollDistanceRef.current
      }

      window.scrollTo(0, scrollOffsetRef.current)
      syncNarrativeProgress(scrollOffsetRef.current, maxScrollDistanceRef.current)
    }

    const handleResize = () => {
      updateScrollBounds()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('resize', handleResize)

    updateScrollBounds()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('resize', handleResize)
    }
  }, [detail])

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
    <div className="theme-modern-bg relative">
      <AnimatePresence>
        {showResumePaper && !detail && (
          <div className="pointer-events-none fixed right-5 top-5 z-30 flex flex-col items-end gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate('/resume')}
              className="theme-primary-pill pointer-events-auto rounded-full px-4 py-2 text-sm font-semibold transition hover:border-[rgb(var(--master-primary)/0.55)] hover:bg-[rgb(var(--master-secondary))]"
            >
              Résumé Paper
            </motion.button>

            {showResumePaperDialog && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="theme-note relative mt-1 max-w-[18rem] rounded-[2rem] px-5 py-4 text-left text-sm backdrop-blur-md"
              >
                <div className="absolute -top-2 right-7 h-4 w-4 rotate-45 border-l border-t border-[rgb(var(--master-accent)/0.65)] bg-[rgb(255_251_235/0.95)]" />
                <p className="text-[10px] uppercase tracking-[0.34em] text-[rgb(var(--master-accent)/0.92)]">Résumé Paper</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-800">{resumePaperMessage}</p>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
      {!detail && (
        <button
          type="button"
          onClick={() => {
            setIsTrackMuted((value) => {
              const nextMuted = !value
              if (!nextMuted) setHasActivatedMusic(true)
              return nextMuted
            })
          }}
          aria-label={isTrackMuted ? 'Turn on background music' : 'Turn off background music'}
          title={isTrackMuted ? 'Music off' : 'Music on'}
          className="theme-control-shell pointer-events-auto fixed left-5 top-5 z-30 flex items-center gap-0 rounded-full p-2 transition md:gap-3 md:px-3 md:py-2"
        >
          <span className="theme-control-icon flex h-9 w-9 items-center justify-center rounded-full">
            {isTrackMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </span>
          <span className="theme-control-text hidden text-xs font-semibold tracking-[0.18em] md:inline">
            {isTrackMuted ? 'MUSIC OFF' : 'MUSIC ON'}
          </span>
        </button>
      )}

      {/* Fixed 3D + overlay layer */}
      <div className="fixed inset-0 z-0">
        <Canvas
          shadows={enableShadows}
          dpr={[1, 1.6]}
          camera={{ position: [0, 26, 95], fov: 42, near: 0.1, far: 1000 }}
          gl={{ toneMappingExposure: 1.35 }}
        >
          <WorkspaceScene profile={vm.profile} skills={skills} enableShadows={enableShadows} />
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
