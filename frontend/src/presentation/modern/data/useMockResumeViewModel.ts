import { useMemo } from 'react'
import type { Experience, Skill, SkillCategory } from '@core/models/resume.model'
import { MOCK_RESUME } from './mockResume'

/**
 * Drop-in replacement for useResumeViewModel that serves static mock data.
 * Returns exactly the same shape so ResumeModernPage needs no other changes.
 */
export function useMockResumeViewModel() {
  const sortedExperiences = useMemo<Experience[]>(
    () =>
      [...MOCK_RESUME.experiences].sort((a, b) => {
        if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      }),
    [],
  )

  const skillsByCategory = useMemo<SkillCategory[]>(
    () => MOCK_RESUME.skills.categories,
    [],
  )

  const skills = useMemo<Skill[]>(
    () => skillsByCategory.flatMap((c) => c.skills),
    [skillsByCategory],
  )

  const totalYearsOfExperience = useMemo<number>(() => {
    const earliest = MOCK_RESUME.experiences.reduce((min, exp) => {
      const year = new Date(exp.startDate).getFullYear()
      return year < min ? year : min
    }, new Date().getFullYear())
    return new Date().getFullYear() - earliest
  }, [])

  return {
    profile: MOCK_RESUME.profile,
    experiences: sortedExperiences,
    education: MOCK_RESUME.education,
    skills: skillsByCategory,
    allSkills: skills,
    projects: MOCK_RESUME.projects,
    certifications: MOCK_RESUME.certifications,
    articles: MOCK_RESUME.articles,
    totalYearsOfExperience,
    isLoading: false,
    isFetching: false,
    isError: false,
    error: null as Error | null,
    refetch: () => {},
  }
}
