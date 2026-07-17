export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'

export interface Profile {
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

export interface Experience {
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

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string | null
  gpa: string | null
  description: string | null
}

export interface Skill {
  id: string
  name: string
  level: SkillLevel
  category: string
  yearsOfExperience: number | null
  projectsCount: number | null
  description: string | null
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface ProjectArchitectureNode {
  id: string
  name: string
  nodeType: string
  order: number
  responsibilities: string[]
  challenges: string[]
  solutions: string[]
  technologies: string[]
}

export interface Project {
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
  architecture: ProjectArchitectureNode[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string | null
  credentialId: string | null
  url: string | null
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  publishedAt: string
}

export interface FullResume {
  profile: Profile
  experiences: Experience[]
  education: Education[]
  skills: { categories: SkillCategory[] }
  projects: Project[]
  certifications: Certification[]
  articles: Article[]
}
