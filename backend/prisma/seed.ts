import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.article.deleteMany()
  await prisma.projectArchitectureNode.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.projectTechnology.deleteMany()
  await prisma.project.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.education.deleteMany()
  await prisma.experienceHighlight.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.profile.deleteMany()

  const profile = await prisma.profile.create({
    data: {
      fullName: 'Jane Doe',
      title: 'Senior Software Engineer',
      summary:
        'Passionate software engineer with 8+ years of experience building scalable distributed systems and mobile applications.',
      email: 'jane.doe@example.com',
      phone: '+1 (555) 000-0000',
      location: 'Bangkok, Thailand',
      linkedin: 'https://linkedin.com/in/janedoe',
      github: 'https://github.com/janedoe',
      website: 'https://janedoe.dev',
      resumeUrl: 'https://janedoe.dev/resume.pdf',
    },
  })

  await prisma.experience.createMany({
    data: [
      {
        profileId: profile.id,
        company: 'Acme Tech',
        position: 'Senior Software Engineer',
        location: 'Remote',
        startDate: new Date('2022-01-01'),
        endDate: null,
        isCurrent: true,
        description: 'Lead backend engineer for the payments platform.',
        order: 0,
      },
      {
        profileId: profile.id,
        company: 'Beta Corp',
        position: 'Software Engineer',
        location: 'Bangkok, Thailand',
        startDate: new Date('2019-03-01'),
        endDate: new Date('2021-12-31'),
        isCurrent: false,
        description: 'Built and maintained mobile banking application.',
        order: 1,
      },
    ],
  })

  await prisma.education.create({
    data: {
      profileId: profile.id,
      institution: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: new Date('2012-08-01'),
      endDate: new Date('2016-05-01'),
      gpa: '3.8',
      order: 0,
    },
  })

  await prisma.skill.createMany({
    data: [
      { profileId: profile.id, name: 'TypeScript', level: 'EXPERT', category: 'Languages', order: 0, yearsOfExperience: 6, projectsCount: 14, description: 'Primary language for both frontend and backend development, from strict domain models to React UI code.' },
      { profileId: profile.id, name: 'Go', level: 'ADVANCED', category: 'Languages', order: 1, yearsOfExperience: 4, projectsCount: 7, description: 'Used for high-throughput microservices and CLI tooling.' },
      { profileId: profile.id, name: 'Python', level: 'ADVANCED', category: 'Languages', order: 2, yearsOfExperience: 3, projectsCount: 5, description: 'Data pipelines, automation scripts, and internal tooling.' },
      { profileId: profile.id, name: 'React', level: 'EXPERT', category: 'Frontend', order: 0, yearsOfExperience: 6, projectsCount: 12, description: 'Component-driven UIs, custom hooks, and state management at scale.' },
      { profileId: profile.id, name: 'Vue.js', level: 'INTERMEDIATE', category: 'Frontend', order: 1, yearsOfExperience: 2, projectsCount: 3, description: 'Used on smaller dashboards and admin panels.' },
      { profileId: profile.id, name: 'Node.js', level: 'EXPERT', category: 'Backend', order: 0, yearsOfExperience: 6, projectsCount: 13, description: 'REST and event-driven services built on Fastify/Express.' },
      { profileId: profile.id, name: 'Fastify', level: 'ADVANCED', category: 'Backend', order: 1, yearsOfExperience: 3, projectsCount: 6, description: 'Preferred framework for new services thanks to schema-based validation and speed.' },
      { profileId: profile.id, name: 'PostgreSQL', level: 'ADVANCED', category: 'Databases', order: 0, yearsOfExperience: 5, projectsCount: 10, description: 'Relational data modelling, indexing, and query optimization.' },
      { profileId: profile.id, name: 'Redis / Valkey', level: 'ADVANCED', category: 'Databases', order: 1, yearsOfExperience: 4, projectsCount: 8, description: 'Caching layers, rate limiting, and session storage.' },
      { profileId: profile.id, name: 'Docker', level: 'ADVANCED', category: 'DevOps', order: 0, yearsOfExperience: 5, projectsCount: 15, description: 'Containerizing services for local dev parity and production deploys.' },
      { profileId: profile.id, name: 'Kubernetes', level: 'INTERMEDIATE', category: 'DevOps', order: 1, yearsOfExperience: 2, projectsCount: 4, description: 'Orchestrating multi-service deployments and autoscaling.' },
      { profileId: profile.id, name: 'Kong Gateway', level: 'INTERMEDIATE', category: 'DevOps', order: 2, yearsOfExperience: 2, projectsCount: 3, description: 'API gateway configuration for routing, CORS, and rate limiting.' },
      { profileId: profile.id, name: 'Swift (iOS)', level: 'ADVANCED', category: 'Mobile', order: 0, yearsOfExperience: 4, projectsCount: 6, description: 'Native iOS apps with modern concurrency and SwiftUI.' },
      { profileId: profile.id, name: 'Kotlin (Android)', level: 'ADVANCED', category: 'Mobile', order: 1, yearsOfExperience: 4, projectsCount: 6, description: 'Native Android apps using Jetpack and coroutines.' },
    ],
  })

  const project = await prisma.project.create({
    data: {
      profileId: profile.id,
      name: 'Resume Web POC',
      description: 'Full-stack resume website with Kong Gateway, Valkey cache, and clean architecture.',
      startDate: new Date('2026-07-01'),
      url: 'https://janedoe.dev/resume',
      githubUrl: 'https://github.com/janedoe/resume-web',
      order: 0,
    },
  })

  await prisma.projectTechnology.createMany({
    data: [
      { projectId: project.id, technology: 'React', order: 0 },
      { projectId: project.id, technology: 'TypeScript', order: 1 },
      { projectId: project.id, technology: 'Node.js', order: 2 },
      { projectId: project.id, technology: 'Kong', order: 3 },
      { projectId: project.id, technology: 'Valkey', order: 4 },
      { projectId: project.id, technology: 'Docker', order: 5 },
    ],
  })

  await prisma.projectArchitectureNode.createMany({
    data: [
      {
        projectId: project.id,
        name: 'Frontend',
        nodeType: 'frontend',
        order: 0,
        responsibilities: ['Render the resume UI', 'Handle client-side routing and caching'],
        challenges: ['Keeping the bundle small while using a 3D rendering stack'],
        solutions: ['Code-split heavy routes', 'Cache API responses with React Query'],
        technologies: ['React', 'TypeScript', 'Vite', 'TanStack Query'],
      },
      {
        projectId: project.id,
        name: 'API Gateway',
        nodeType: 'gateway',
        order: 1,
        responsibilities: ['Single entry point for all API traffic', 'CORS, rate limiting, and routing'],
        challenges: ['Keeping gateway config in sync with backend routes'],
        solutions: ['Declarative kong.yml checked into version control'],
        technologies: ['Kong Gateway'],
      },
      {
        projectId: project.id,
        name: 'Backend',
        nodeType: 'backend',
        order: 2,
        responsibilities: ['Serve resume data via REST endpoints', 'Enforce clean architecture boundaries'],
        challenges: ['Avoiding duplicate queries across nested resources'],
        solutions: ['Repository layer with per-entity caching', 'Zod validation at the controller boundary'],
        technologies: ['Node.js', 'Fastify', 'TypeScript'],
      },
      {
        projectId: project.id,
        name: 'Redis / Valkey',
        nodeType: 'cache',
        order: 3,
        responsibilities: ['Cache frequently requested resume data', 'Reduce database load'],
        challenges: ['Stale data after content updates'],
        solutions: ['Short TTL with explicit cache-flush during content edits'],
        technologies: ['Valkey', 'ioredis'],
      },
      {
        projectId: project.id,
        name: 'PostgreSQL',
        nodeType: 'database',
        order: 4,
        responsibilities: ['Durable storage for profile, experience, skills, and projects'],
        challenges: ['Modelling one-to-many resume sections cleanly'],
        solutions: ['Normalized schema with Prisma migrations'],
        technologies: ['PostgreSQL', 'Prisma'],
      },
      {
        projectId: project.id,
        name: 'Docker / Cloud',
        nodeType: 'cloud',
        order: 5,
        responsibilities: ['Package and run every service consistently across environments'],
        challenges: ['Local dev parity with production'],
        solutions: ['docker-compose for all services with health checks'],
        technologies: ['Docker', 'Docker Compose'],
      },
    ],
  })

  await prisma.article.createMany({
    data: [
      {
        profileId: profile.id,
        title: 'Designing a Clean Architecture Resume API',
        slug: 'clean-architecture-resume-api',
        excerpt: 'How I structured a Fastify + Prisma backend into domain, application, and infrastructure layers.',
        content:
          'A walkthrough of splitting a small resume API into domain entities, use-case services, and infrastructure repositories so business logic never depends on Prisma directly.',
        tags: ['architecture', 'backend', 'nodejs'],
        publishedAt: new Date('2026-03-10'),
        order: 0,
      },
      {
        profileId: profile.id,
        title: 'Caching Strategy with Valkey in Front of PostgreSQL',
        slug: 'caching-strategy-valkey-postgresql',
        excerpt: 'Practical patterns for TTL-based caching, cache keys, and invalidation on write.',
        content:
          'Notes on choosing cache keys per resource, setting sane TTLs, and manually flushing cache entries when content changes to avoid stale reads.',
        tags: ['redis', 'valkey', 'performance'],
        publishedAt: new Date('2026-04-22'),
        order: 1,
      },
      {
        profileId: profile.id,
        title: 'Building a Cinematic 3D Portfolio with React Three Fiber',
        slug: 'cinematic-3d-portfolio-r3f',
        excerpt: 'Lessons learned choreographing camera movement with GSAP inside a React Three Fiber scene.',
        content:
          'A look at structuring reusable 3D scene components, driving camera timelines with GSAP ScrollTrigger, and keeping frame rate high with stylized low-poly geometry.',
        tags: ['three.js', 'react-three-fiber', 'gsap'],
        publishedAt: new Date('2026-06-30'),
        order: 2,
      },
    ],
  })

  await prisma.certification.create({
    data: {
      profileId: profile.id,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      issueDate: new Date('2024-01-15'),
      expiryDate: new Date('2027-01-15'),
      credentialId: 'AWS-SAA-000000',
      url: 'https://aws.amazon.com/certification/',
      order: 0,
    },
  })

  console.log('Seed completed.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
