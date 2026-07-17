import type {
  ProfileEntity,
  ExperienceEntity,
  EducationEntity,
  SkillCategoryEntity,
  ProjectEntity,
  CertificationEntity,
  ArticleEntity,
  FullResumeEntity,
} from '../entities/resume.entity'

export interface IResumeRepository {
  getDefaultProfileId(): Promise<string | null>
  getProfile(profileId: string): Promise<ProfileEntity | null>
  getExperiences(profileId: string, limit?: number, offset?: number): Promise<{ data: ExperienceEntity[]; total: number }>
  getEducation(profileId: string): Promise<EducationEntity[]>
  getSkills(profileId: string): Promise<{ categories: SkillCategoryEntity[] }>
  getProjects(profileId: string): Promise<ProjectEntity[]>
  getCertifications(profileId: string): Promise<CertificationEntity[]>
  getArticles(profileId: string): Promise<ArticleEntity[]>
  getArticleBySlug(profileId: string, slug: string): Promise<ArticleEntity | null>
  getFullResume(profileId: string): Promise<FullResumeEntity | null>
}
