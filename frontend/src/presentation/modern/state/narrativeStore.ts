import { create } from 'zustand'

/**
 * Ordered narrative stages. Each occupies an equal slice of the master
 * scroll timeline (see STAGE_RANGES below). "projectDetail", "skillDetail"
 * and "article" are entered via click (not scroll) while sitting inside
 * "projects", "skills" and "blog" respectively.
 */
export const STAGES = [
  'intro',
  'laptopOpen',
  'enterLaptop',
  'home',
  'experience',
  'projects',
  'skills',
  'blog',
  'contact',
  'ending',
] as const

export type StageId = (typeof STAGES)[number]

export type DetailId = 'projectDetail' | 'skillDetail' | 'article' | null

interface NarrativeState {
  /** Overall scroll progress across the whole experience, 0..1 */
  progress: number
  /** Current primary stage, derived from progress */
  stage: StageId
  /** Non-scroll "drill-in" overlay, layered on top of a stage */
  detail: DetailId
  activeProjectId: string | null
  activeSkillId: string | null
  activeArticleSlug: string | null
  hasStarted: boolean

  setProgress: (p: number) => void
  setStage: (s: StageId) => void
  openProjectDetail: (id: string) => void
  openSkillDetail: (id: string) => void
  openArticle: (slug: string) => void
  closeDetail: () => void
  markStarted: () => void
}

export const useNarrativeStore = create<NarrativeState>((set) => ({
  progress: 0,
  stage: 'intro',
  detail: null,
  activeProjectId: null,
  activeSkillId: null,
  activeArticleSlug: null,
  hasStarted: false,

  setProgress: (p) => set({ progress: p }),
  setStage: (s) => set({ stage: s }),
  openProjectDetail: (id) => set({ detail: 'projectDetail', activeProjectId: id }),
  openSkillDetail: (id) => set({ detail: 'skillDetail', activeSkillId: id }),
  openArticle: (slug) => set({ detail: 'article', activeArticleSlug: slug }),
  closeDetail: () => set({ detail: null, activeProjectId: null, activeSkillId: null, activeArticleSlug: null }),
  markStarted: () => set({ hasStarted: true }),
}))
