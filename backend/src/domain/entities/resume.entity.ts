export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'

export interface ProfileEntity {
  id: string
  fullName: string
  title: string
  summary: string
  email: string
  phone: string | null
  location: string | null
  resumeUrl: string | null
  links: {
    linkedin: string | null
    github: string | null
    website: string | null
  }
}

export interface ExperienceEntity {
  id: string
  company: string
  position: string
  location: string | null
  startDate: string
  endDate: string | null
  isCurrent: boolean
  description: string
  highlights: string[]
}

export interface EducationEntity {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string | null
  gpa: string | null
  description: string | null
}

export interface SkillEntity {
  id: string
  name: string
  level: SkillLevel
  category: string
  yearsOfExperience: number | null
  projectsCount: number | null
  description: string | null
}

export interface SkillCategoryEntity {
  name: string
  skills: SkillEntity[]
}

export interface ProjectArchitectureNodeEntity {
  id: string
  name: string
  nodeType: string
  order: number
  responsibilities: string[]
  challenges: string[]
  solutions: string[]
  technologies: string[]
}

export interface ProjectEntity {
  id: string
  name: string
  description: string
  startDate: string | null
  endDate: string | null
  technologies: string[]
  links: {
    url: string | null
    github: string | null
  }
  architecture: ProjectArchitectureNodeEntity[]
}

export interface CertificationEntity {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string | null
  credentialId: string | null
  url: string | null
}

export interface ArticleEntity {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  publishedAt: string
}

export interface FullResumeEntity {
  profile: ProfileEntity
  experiences: ExperienceEntity[]
  education: EducationEntity[]
  skills: { categories: SkillCategoryEntity[] }
  projects: ProjectEntity[]
  certifications: CertificationEntity[]
  articles: ArticleEntity[]
}
