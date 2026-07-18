import type { IResumeRepository } from '../../domain/repositories/IResumeRepository'
import type {
  ProfileEntity,
  ExperienceEntity,
  EducationEntity,
  SkillCategoryEntity,
  ProjectEntity,
  CertificationEntity,
  ArticleEntity,
  FullResumeEntity,
} from '../../domain/entities/resume.entity'

export class ResumeService {
  constructor(private readonly repository: IResumeRepository) {}

  async resolveProfileId(): Promise<string> {
    const id = await this.repository.getDefaultProfileId()
    if (!id) throw new NotFoundError('No profile found in database')
    return id
  }

  async getProfile(profileId: string): Promise<ProfileEntity> {
    const profile = await this.repository.getProfile(profileId)
    if (!profile) throw new NotFoundError(`Profile ${profileId} not found`)
    return profile
  }

  async getExperiences(
    profileId: string,
    limit = 20,
    offset = 0,
  ): Promise<{ data: ExperienceEntity[]; total: number }> {
    return this.repository.getExperiences(profileId, limit, offset)
  }

  async getEducation(profileId: string): Promise<EducationEntity[]> {
    return this.repository.getEducation(profileId)
  }

  async getSkills(profileId: string): Promise<{ categories: SkillCategoryEntity[] }> {
    return this.repository.getSkills(profileId)
  }

  async getProjects(profileId: string): Promise<ProjectEntity[]> {
    return this.repository.getProjects(profileId)
  }

  async getCertifications(profileId: string): Promise<CertificationEntity[]> {
    return this.repository.getCertifications(profileId)
  }

  async getArticles(profileId: string): Promise<ArticleEntity[]> {
    return this.repository.getArticles(profileId)
  }

  async getArticleBySlug(profileId: string, slug: string): Promise<ArticleEntity> {
    const article = await this.repository.getArticleBySlug(profileId, slug)
    if (!article) throw new NotFoundError(`Article '${slug}' not found`)
    return article
  }

  async getFullResume(profileId: string): Promise<FullResumeEntity> {
    const resume = await this.repository.getFullResume(profileId)
    if (!resume) throw new NotFoundError(`Resume for profile ${profileId} not found`)
    return resume
  }
}

export class NotFoundError extends Error {
  readonly code = 'NOT_FOUND'
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}
