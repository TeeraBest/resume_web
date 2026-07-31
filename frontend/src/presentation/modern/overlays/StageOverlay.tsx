import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import type { Article, Experience, Profile, Project, Skill } from '@core/models/resume.model'
import { useNarrativeStore } from '../state/narrativeStore'
import { HomeOverlay } from './HomeOverlay'
import { ExperienceOverlay } from './ExperienceOverlay'
import { ProjectsOverlay } from './ProjectsOverlay'
import { ProjectDetailOverlay } from './ProjectDetailOverlay'
import { SkillDetailOverlay, SkillsHint } from './SkillDetailOverlay'
import { BlogOverlay } from './BlogOverlay'
import { ArticleOverlay } from './ArticleOverlay'
import { ContactOverlay } from './ContactOverlay'
import { IntroHint } from './IntroHint'

interface StageOverlayProps {
  profile: Profile | null
  experiences: Experience[]
  projects: Project[]
  skills: Skill[]
  articles: Article[]
}

export function StageOverlay({ profile, experiences, projects, skills, articles }: StageOverlayProps) {
  const stage = useNarrativeStore((s) => s.stage)
  const detail = useNarrativeStore((s) => s.detail)
  const activeProjectId = useNarrativeStore((s) => s.activeProjectId)
  const activeSkillId = useNarrativeStore((s) => s.activeSkillId)
  const activeArticleSlug = useNarrativeStore((s) => s.activeArticleSlug)
  const isPostStage = stage.startsWith('post-')
  const showHomeOverlay = !isPostStage && (stage === 'enterLaptop' || stage === 'home')

  useEffect(() => {
    if (detail !== 'projectDetail' && detail !== 'skillDetail') return

    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousHtmlOverflow = documentElement.style.overflow
    const previousBodyOverscroll = body.style.overscrollBehavior
    const previousHtmlOverscroll = documentElement.style.overscrollBehavior

    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'none'
    documentElement.style.overscrollBehavior = 'none'

    return () => {
      body.style.overflow = previousBodyOverflow
      documentElement.style.overflow = previousHtmlOverflow
      body.style.overscrollBehavior = previousBodyOverscroll
      documentElement.style.overscrollBehavior = previousHtmlOverscroll
    }
  }, [detail])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {detail === 'projectDetail' && (
          <ProjectDetailOverlay key="project-detail" project={projects.find((p) => p.id === activeProjectId)} />
        )}
        {detail === 'skillDetail' && (
          <SkillDetailOverlay key="skill-detail" skill={skills.find((s) => s.id === activeSkillId)} />
        )}
        {detail === 'article' && (
          <ArticleOverlay key="article" article={articles.find((a) => a.slug === activeArticleSlug)} />
        )}

        {!detail && !isPostStage && (stage === 'intro' || stage === 'ending') && <IntroHint key="intro-hint" />}
        {!detail && showHomeOverlay && <HomeOverlay key="home" profile={profile} />}
        {!detail && !isPostStage && stage === 'experience' && <ExperienceOverlay key="experience" experiences={experiences} />}
        {!detail && !isPostStage && stage === 'projects' && <ProjectsOverlay key="projects" projects={projects} />}
        {!detail && !isPostStage && stage === 'skills' && <SkillsHint key="skills-hint" />}
        {!detail && !isPostStage && stage === 'blog' && <BlogOverlay key="blog" articles={articles} />}
        {!detail && !isPostStage && stage === 'contact' && <ContactOverlay key="contact" profile={profile} />}
      </AnimatePresence>
    </div>
  )
}
