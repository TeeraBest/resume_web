import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { GetResumeMockUseCase } from '@domain/usecases/getResumeMock.usecase'
import type { Experience, SkillCategory } from '@core/models/resume.model'

// const repository = new ResumeRepository()
// const getResumeUseCase = new GetResumeUseCase(repository)
const getResumeUseCase = new GetResumeMockUseCase()

export const RESUME_QUERY_KEY = ['resume', 'full'] as const

export function useResumeViewModel() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: RESUME_QUERY_KEY,
    queryFn: () => getResumeUseCase.execute(),
    staleTime: 5 * 60 * 1000,  // 5 min — mirrors server-side TTL
    retry: 2,
  })

  const sortedExperiences = useMemo<Experience[]>(() => {
    if (!data?.experiences) return []
    return [...data.experiences].sort((a, b) => {
      if (a.isCurrent !== b.isCurrent) return a.isCurrent ? -1 : 1
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  }, [data?.experiences])

  const skillsByCategory = useMemo<SkillCategory[]>(() => {
    return data?.skills?.categories ?? []
  }, [data?.skills])

  const totalYearsOfExperience = useMemo<number>(() => {
    if (!data?.experiences?.length) return 0
    const earliest = data.experiences.reduce((min, exp) => {
      const start = new Date(exp.startDate).getFullYear()
      return start < min ? start : min
    }, new Date().getFullYear())
    return new Date().getFullYear() - earliest
  }, [data?.experiences])

  return {
    profile: data?.profile ?? null,
    experiences: sortedExperiences,
    education: data?.education ?? [],
    skills: skillsByCategory,
    projects: data?.projects ?? [],
    certifications: data?.certifications ?? [],
    articles: data?.articles ?? [],
    totalYearsOfExperience,
    isLoading,
    isFetching,
    isError,
    error: error as Error | null,
    refetch,
  }
}
