import type { PrismaClient } from '@prisma/client'
import type { IResumeRepository } from '../../domain/repositories/IResumeRepository'
import type {
  ProfileEntity,
  ExperienceEntity,
  EducationEntity,
  SkillCategoryEntity,
  SkillLevel,
  ProjectEntity,
  CertificationEntity,
  ArticleEntity,
  FullResumeEntity,
} from '../../domain/entities/resume.entity'
import { getFromCache, setInCache, cacheKey } from '../cache/valkey.client'

export class ResumeRepository implements IResumeRepository {
  constructor(private readonly db: PrismaClient) {}

  async getDefaultProfileId(): Promise<string | null> {
    const profile = await this.db.profile.findFirst({ select: { id: true } })
    return profile?.id ?? null
  }

  async getProfile(profileId: string): Promise<ProfileEntity | null> {
    const key = cacheKey('resume', 'profile', profileId)
    const cached = await getFromCache<ProfileEntity>(key)
    if (cached) return cached

    const row = await this.db.profile.findUnique({ where: { id: profileId } })
    if (!row) return null

    const entity: ProfileEntity = {
      id: row.id,
      fullName: row.fullName,
      title: row.title,
      summary: row.summary,
      email: row.email,
      phone: row.phone,
      location: row.location,
      resumeUrl: row.resumeUrl,
      links: { linkedin: row.linkedin, github: row.github, website: row.website },
    }
    await setInCache(key, entity)
    return entity
  }

  async getExperiences(profileId: string, limit = 20, offset = 0): Promise<{ data: ExperienceEntity[]; total: number }> {
    const key = cacheKey('resume', 'experience', profileId, `l${limit}`, `o${offset}`)
    const cached = await getFromCache<{ data: ExperienceEntity[]; total: number }>(key)
    if (cached) return cached

    const [rows, total] = await Promise.all([
      this.db.experience.findMany({
        where: { profileId },
        include: { highlights: { orderBy: { order: 'asc' } } },
        orderBy: [{ isCurrent: 'desc' }, { startDate: 'desc' }],
        take: limit,
        skip: offset,
      }),
      this.db.experience.count({ where: { profileId } }),
    ])

    const data: ExperienceEntity[] = rows.map((r) => ({
      id: r.id,
      company: r.company,
      position: r.position,
      location: r.location,
      startDate: r.startDate.toISOString().split('T')[0],
      endDate: r.endDate ? r.endDate.toISOString().split('T')[0] : null,
      isCurrent: r.isCurrent,
      description: r.description,
      highlights: r.highlights.map((h) => h.description),
    }))

    const result = { data, total }
    await setInCache(key, result)
    return result
  }

  async getEducation(profileId: string): Promise<EducationEntity[]> {
    const key = cacheKey('resume', 'education', profileId)
    const cached = await getFromCache<EducationEntity[]>(key)
    if (cached) return cached

    const rows = await this.db.education.findMany({
      where: { profileId },
      orderBy: { startDate: 'desc' },
    })

    const entities: EducationEntity[] = rows.map((r) => ({
      id: r.id,
      institution: r.institution,
      degree: r.degree,
      field: r.field,
      startDate: r.startDate.toISOString().split('T')[0],
      endDate: r.endDate ? r.endDate.toISOString().split('T')[0] : null,
      gpa: r.gpa,
      description: r.description,
    }))

    await setInCache(key, entities)
    return entities
  }

  async getSkills(profileId: string): Promise<{ categories: SkillCategoryEntity[] }> {
    const key = cacheKey('resume', 'skills', profileId)
    const cached = await getFromCache<{ categories: SkillCategoryEntity[] }>(key)
    if (cached) return cached

    const rows = await this.db.skill.findMany({
      where: { profileId },
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    })

    const categoryMap = new Map<string, SkillCategoryEntity>()
    for (const row of rows) {
      if (!categoryMap.has(row.category)) {
        categoryMap.set(row.category, { name: row.category, skills: [] })
      }
      categoryMap.get(row.category)!.skills.push({
        id: row.id,
        name: row.name,
        level: row.level as SkillLevel,
        category: row.category,
        yearsOfExperience: row.yearsOfExperience,
        projectsCount: row.projectsCount,
        description: row.description,
      })
    }

    const result = { categories: Array.from(categoryMap.values()) }
    await setInCache(key, result)
    return result
  }

  async getProjects(profileId: string): Promise<ProjectEntity[]> {
    const key = cacheKey('resume', 'projects', profileId)
    const cached = await getFromCache<ProjectEntity[]>(key)
    if (cached) return cached

    const rows = await this.db.project.findMany({
      where: { profileId },
      include: {
        technologies: { orderBy: { order: 'asc' } },
        architecture: { orderBy: { order: 'asc' } },
      },
      orderBy: { order: 'asc' },
    })

    const entities: ProjectEntity[] = rows.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      startDate: r.startDate ? r.startDate.toISOString().split('T')[0] : null,
      endDate: r.endDate ? r.endDate.toISOString().split('T')[0] : null,
      technologies: r.technologies.map((t) => t.technology),
      links: { url: r.url, github: r.githubUrl },
      architecture: r.architecture.map((a) => ({
        id: a.id,
        name: a.name,
        nodeType: a.nodeType,
        order: a.order,
        responsibilities: a.responsibilities,
        challenges: a.challenges,
        solutions: a.solutions,
        technologies: a.technologies,
      })),
    }))

    await setInCache(key, entities)
    return entities
  }

  async getCertifications(profileId: string): Promise<CertificationEntity[]> {
    const key = cacheKey('resume', 'certifications', profileId)
    const cached = await getFromCache<CertificationEntity[]>(key)
    if (cached) return cached

    const rows = await this.db.certification.findMany({
      where: { profileId },
      orderBy: { issueDate: 'desc' },
    })

    const entities: CertificationEntity[] = rows.map((r) => ({
      id: r.id,
      name: r.name,
      issuer: r.issuer,
      issueDate: r.issueDate.toISOString().split('T')[0],
      expiryDate: r.expiryDate ? r.expiryDate.toISOString().split('T')[0] : null,
      credentialId: r.credentialId,
      url: r.url,
    }))

    await setInCache(key, entities)
    return entities
  }

  async getArticles(profileId: string): Promise<ArticleEntity[]> {
    const key = cacheKey('resume', 'articles', profileId)
    const cached = await getFromCache<ArticleEntity[]>(key)
    if (cached) return cached

    const rows = await this.db.article.findMany({
      where: { profileId },
      orderBy: [{ order: 'asc' }, { publishedAt: 'desc' }],
    })

    const entities: ArticleEntity[] = rows.map((r) => ({
      id: r.id,
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt,
      content: r.content,
      coverImage: r.coverImage,
      tags: r.tags,
      publishedAt: r.publishedAt.toISOString().split('T')[0],
    }))

    await setInCache(key, entities)
    return entities
  }

  async getArticleBySlug(profileId: string, slug: string): Promise<ArticleEntity | null> {
    const key = cacheKey('resume', 'article', profileId, slug)
    const cached = await getFromCache<ArticleEntity>(key)
    if (cached) return cached

    const row = await this.db.article.findFirst({ where: { profileId, slug } })
    if (!row) return null

    const entity: ArticleEntity = {
      id: row.id,
      title: row.title,
      slug: row.slug,
      excerpt: row.excerpt,
      content: row.content,
      coverImage: row.coverImage,
      tags: row.tags,
      publishedAt: row.publishedAt.toISOString().split('T')[0],
    }

    await setInCache(key, entity)
    return entity
  }

  async getFullResume(profileId: string): Promise<FullResumeEntity | null> {
    const key = cacheKey('resume', 'full', profileId)
    const cached = await getFromCache<FullResumeEntity>(key)
    if (cached) return cached

    const profile = await this.getProfile(profileId)
    if (!profile) return null

    const [{ data: experiences }, education, skills, projects, certifications, articles] = await Promise.all([
      this.getExperiences(profileId),
      this.getEducation(profileId),
      this.getSkills(profileId),
      this.getProjects(profileId),
      this.getCertifications(profileId),
      this.getArticles(profileId),
    ])

    const resume: FullResumeEntity = { profile, experiences, education, skills, projects, certifications, articles }
    await setInCache(key, resume)
    return resume
  }
}
