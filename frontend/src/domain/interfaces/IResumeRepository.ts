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

export interface IResumeRepository {
  getFullResume(): Promise<FullResume>
  getProfile(): Promise<Profile>
  getExperiences(limit?: number, offset?: number): Promise<{ data: Experience[]; total: number }>
  getEducation(): Promise<Education[]>
  getSkills(): Promise<{ categories: SkillCategory[] }>
  getProjects(): Promise<Project[]>
  getCertifications(): Promise<Certification[]>
  getArticles(): Promise<Article[]>
  getArticleBySlug(slug: string): Promise<Article>
}
