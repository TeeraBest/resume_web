import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { GetResumeMockUseCase } from '@domain/usecases/getResumeMock.usecase'
import { GetResumeUseCase } from '@domain/usecases/getResume.usecase'
import { ResumeRepository } from '@data/repositories/resume.repository'
import type { Experience, FullResume, SkillCategory } from '@core/models/resume.model'

const repository = new ResumeRepository()
const getResumeUseCase = new GetResumeUseCase(repository)
const getResumeMockUseCase = new GetResumeMockUseCase()

export const RESUME_QUERY_KEY = ['resume', 'full'] as const

async function fetchResumeWithFallback(): Promise<FullResume> {
  const maxAttempts = 3

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await getResumeUseCase.execute()
    } catch {
      if (attempt === maxAttempts) {
        return getResumeMockUseCase.execute()
      }
    }
  }

  return getResumeMockUseCase.execute()
}

export function useResumeViewModel() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: RESUME_QUERY_KEY,
    queryFn: fetchResumeWithFallback,
    initialData: getResumeMockUseCase.execute(),
    staleTime: 5 * 60 * 1000,
    retry: false,
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
