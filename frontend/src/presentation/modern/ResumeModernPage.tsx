import { useEffect, useRef } from 'react'
import { useState } from 'react'
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

const SCROLL_VH_PER_STAGE = 110

export function ResumeModernPage() {
  const vm = useMockResumeViewModel()
  const scrollSpacerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [showResumePaper, setShowResumePaper] = useState(false)
  const [showResumePaperDialog, setShowResumePaperDialog] = useState(false)
  const [resumePaperMessage, setResumePaperMessage] = useState('')
  const skills = vm.allSkills

  const resumePaperMessages = [
    'I have the paper version as well. No worryyy',
    'Paper version is here.',
    'Love it right? , you can also see my details here too',
  ]

  useEffect(() => {
    const showButtonTimer = window.setTimeout(() => {
      setShowResumePaper(true)
    }, 10_000)

    const showDialogTimer = window.setTimeout(() => {
      setResumePaperMessage(resumePaperMessages[Math.floor(Math.random() * resumePaperMessages.length)])
      setShowResumePaperDialog(true)
    }, 13_000)

    const hideDialogTimer = window.setTimeout(() => {
      setShowResumePaperDialog(false)
    }, 18_000)

    return () => {
      window.clearTimeout(showButtonTimer)
      window.clearTimeout(showDialogTimer)
      window.clearTimeout(hideDialogTimer)
    }
  }, [])

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
      <AnimatePresence>
        {showResumePaper && (
          <div className="pointer-events-none fixed right-5 top-5 z-30 flex flex-col items-end gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate('/resume')}
              className="pointer-events-auto rounded-full border border-cyan-300/35 bg-slate-950/92 px-4 py-2 text-sm font-semibold text-cyan-100 shadow-[0_0_28px_rgba(79,214,255,0.18)] backdrop-blur-md hover:border-cyan-200/55 hover:bg-slate-900"
            >
              Resume Paper
            </motion.button>

            {showResumePaperDialog && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-1 max-w-[18rem] rounded-[2rem] border border-amber-300/70 bg-amber-50/95 px-5 py-4 text-left text-sm text-slate-900 shadow-[0_14px_34px_rgba(245,158,11,0.25)] backdrop-blur-md"
              >
                <div className="absolute -top-2 right-7 h-4 w-4 rotate-45 border-l border-t border-amber-300/70 bg-amber-50/95" />
                <p className="text-[10px] uppercase tracking-[0.34em] text-amber-700/90">Resume Paper</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-800">{resumePaperMessage}</p>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>

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
