import type {
  Profile,
  Experience,
  Education,
  SkillCategory,
  Project,
  Certification,
  Article,
  FullResume,
} from '@core/models/resume.model'
import type { ApiResponse } from '@core/types/api.types'
import type { IResumeRepository } from '@domain/interfaces/IResumeRepository'
import { apiClient } from '@data/http/api.client'

export class ResumeRepository implements IResumeRepository {
  async getFullResume(): Promise<FullResume> {
    const { data } = await apiClient.get<ApiResponse<FullResume>>('/resume')
    return data.data
  }

  async getProfile(): Promise<Profile> {
    const { data } = await apiClient.get<ApiResponse<Profile>>('/resume/profile')
    return data.data
  }

  async getExperiences(limit = 20, offset = 0): Promise<{ data: Experience[]; total: number }> {
    const { data } = await apiClient.get<ApiResponse<Experience[]>>('/resume/experience', {
      params: { limit, offset },
    })
    return { data: data.data, total: data.meta.total ?? 0 }
  }

  async getEducation(): Promise<Education[]> {
    const { data } = await apiClient.get<ApiResponse<Education[]>>('/resume/education')
    return data.data
  }

  async getSkills(): Promise<{ categories: SkillCategory[] }> {
    const { data } = await apiClient.get<ApiResponse<{ categories: SkillCategory[] }>>('/resume/skills')
    return data.data
  }

  async getProjects(): Promise<Project[]> {
    const { data } = await apiClient.get<ApiResponse<Project[]>>('/resume/projects')
    return data.data
  }

  async getCertifications(): Promise<Certification[]> {
    const { data } = await apiClient.get<ApiResponse<Certification[]>>('/resume/certifications')
    return data.data
  }

  async getArticles(): Promise<Article[]> {
    const { data } = await apiClient.get<ApiResponse<Article[]>>('/resume/articles')
    return data.data
  }

  async getArticleBySlug(slug: string): Promise<Article> {
    const { data } = await apiClient.get<ApiResponse<Article>>(`/resume/articles/${slug}`)
    return data.data
  }
}
