import type { FullResume } from '@core/models/resume.model'

/**
 * Static mock data for the /resume_modern experience.
 * Swap this out (or replace the hook in ResumeModernPage) to use the real API.
 */
export const MOCK_RESUME: FullResume = {
  profile: {
    id: 'mock-profile-1',
    fullName: 'Teerapon Jeamphue',
    title: 'Senior Full Stack Developer',
    summary:
      'Passionate full-stack developer with 7+ years of experience. My coding journey started at 15 setting up a Minecraft server, evolved through WordPress, freelance Android development, and now enterprise full-stack work at Accenture involving generative AI, banking systems, Go microservices, and mobile apps.',
    email: 'trp.aof@gmail.com',
    phone: '+66 99 999 9999',
    location: 'Bangkok, Thailand',
    resumeUrl: null,
    links: {
      linkedin: 'https://linkedin.com/in/teerapon',
      github: 'https://github.com/teerapon19',
      website: 'https://www.teerapon.space',
    },
  },

  experiences: [
    {
      id: 'exp-1',
      company: 'Accenture',
      position: 'Packaged App Development Senior Analyst',
      location: 'Bangkok, Thailand',
      startDate: '2023-06-01',
      endDate: null,
      isCurrent: true,
      description: 'Working with generative AI (Gemini, GPT) and developing applications that interact with banking systems.',
      highlights: [
        'Integrated Gemini and OpenAI GPT into internal banking tools',
        'Built web APIs in Golang and Java for bank-facing microservices',
        'Led architecture decisions for a new AI-assisted customer portal',
      ],
    },
    {
      id: 'exp-2',
      company: 'Accenture',
      position: 'Golang Developer (Contractor)',
      location: 'Bangkok, Thailand',
      startDate: '2022-11-01',
      endDate: '2023-05-31',
      isCurrent: false,
      description: 'Wrote web APIs in Golang for financial web services following microservice architecture principles.',
      highlights: [
        'Designed and implemented 12 REST endpoints consumed by mobile apps',
        'Improved average API response time by 35% via query optimisation',
      ],
    },
    {
      id: 'exp-3',
      company: 'Tokenine',
      position: 'Full Stack Developer',
      location: 'Bangkok, Thailand',
      startDate: '2021-06-01',
      endDate: '2022-05-31',
      isCurrent: false,
      description: 'Developed websites integrated with Web3 / blockchain, wrote EVM smart contracts, and designed micro-service back-ends.',
      highlights: [
        'Built ERC-20, ERC-721 smart contracts in Solidity',
        'Designed micro-service architecture for an NFT marketplace',
        'Wrote Node.js and Go back-end APIs',
      ],
    },
    {
      id: 'exp-4',
      company: 'LINEMAN WONGNAI',
      position: 'Android Application Developer Intern',
      location: 'Bangkok, Thailand',
      startDate: '2020-04-01',
      endDate: '2020-06-30',
      isCurrent: false,
      description: 'Developed Android features using MVP and MVVM patterns in an Agile team.',
      highlights: [
        'Worked in 2-week Agile sprints with daily stand-ups',
        'Delivered 3 production Android features using Kotlin + MVVM',
      ],
    },
    {
      id: 'exp-5',
      company: 'Freelance',
      position: 'Full Stack & Android Developer',
      location: 'Remote',
      startDate: '2018-04-01',
      endDate: '2021-06-30',
      isCurrent: false,
      description: 'Website and Android app development across Laravel, Vue, Node.js, Go, and native Android; also hardware projects with Arduino and Raspberry Pi.',
      highlights: [
        'Delivered 20+ freelance projects via FastWork and direct clients',
        'Built full-stack web apps and native Android apps for SMEs',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'Khon Kaen University',
      degree: 'Bachelor of Engineering',
      field: 'Computer Engineering',
      startDate: '2017-08-01',
      endDate: '2021-05-01',
      gpa: null,
      description: null,
    },
  ],

  skills: {
    categories: [
      {
        name: 'Languages',
        skills: [
          { id: 'sk-ts', name: 'TypeScript', level: 'EXPERT', category: 'Languages', yearsOfExperience: 6, projectsCount: 14, description: 'Primary language for both frontend and backend—strict domain models to React UI code.' },
          { id: 'sk-go', name: 'Go', level: 'ADVANCED', category: 'Languages', yearsOfExperience: 4, projectsCount: 7, description: 'High-throughput microservices and CLI tooling at Accenture.' },
          { id: 'sk-kt', name: 'Kotlin', level: 'ADVANCED', category: 'Languages', yearsOfExperience: 4, projectsCount: 6, description: 'Native Android apps using Jetpack and coroutines.' },
          { id: 'sk-py', name: 'Python', level: 'ADVANCED', category: 'Languages', yearsOfExperience: 3, projectsCount: 5, description: 'Data pipelines, automation scripts, LangChain integrations.' },
          { id: 'sk-sw', name: 'Swift', level: 'ADVANCED', category: 'Languages', yearsOfExperience: 4, projectsCount: 6, description: 'Native iOS apps with SwiftUI and modern concurrency.' },
        ],
      },
      {
        name: 'Frontend',
        skills: [
          { id: 'sk-react', name: 'React', level: 'EXPERT', category: 'Frontend', yearsOfExperience: 6, projectsCount: 12, description: 'Component-driven UIs, custom hooks, and state management at scale.' },
          { id: 'sk-vue', name: 'Vue.js', level: 'INTERMEDIATE', category: 'Frontend', yearsOfExperience: 2, projectsCount: 3, description: 'Used on smaller dashboards and admin panels.' },
          { id: 'sk-tw', name: 'Tailwind CSS', level: 'EXPERT', category: 'Frontend', yearsOfExperience: 4, projectsCount: 10, description: 'Rapid, consistent UI styling across all recent projects.' },
        ],
      },
      {
        name: 'Backend',
        skills: [
          { id: 'sk-node', name: 'Node.js', level: 'EXPERT', category: 'Backend', yearsOfExperience: 6, projectsCount: 13, description: 'REST and event-driven services on Fastify and Express.' },
          { id: 'sk-fastify', name: 'Fastify', level: 'ADVANCED', category: 'Backend', yearsOfExperience: 3, projectsCount: 6, description: 'Schema-based validation and high performance for new services.' },
          { id: 'sk-fiber', name: 'Fiber (Go)', level: 'ADVANCED', category: 'Backend', yearsOfExperience: 3, projectsCount: 5, description: 'Go HTTP framework used at Accenture for bank-facing APIs.' },
        ],
      },
      {
        name: 'Databases',
        skills: [
          { id: 'sk-pg', name: 'PostgreSQL', level: 'ADVANCED', category: 'Databases', yearsOfExperience: 5, projectsCount: 10, description: 'Relational data modelling, indexing, and query optimisation.' },
          { id: 'sk-redis', name: 'Redis / Valkey', level: 'ADVANCED', category: 'Databases', yearsOfExperience: 4, projectsCount: 8, description: 'Caching layers, rate limiting, and session storage.' },
          { id: 'sk-mongo', name: 'MongoDB', level: 'INTERMEDIATE', category: 'Databases', yearsOfExperience: 2, projectsCount: 4, description: 'Document storage for flexible, schema-light back-ends.' },
        ],
      },
      {
        name: 'DevOps',
        skills: [
          { id: 'sk-docker', name: 'Docker', level: 'ADVANCED', category: 'DevOps', yearsOfExperience: 5, projectsCount: 15, description: 'Containerising services for local dev parity and production deploys.' },
          { id: 'sk-k8s', name: 'Kubernetes', level: 'INTERMEDIATE', category: 'DevOps', yearsOfExperience: 2, projectsCount: 4, description: 'Orchestrating multi-service deployments and autoscaling.' },
          { id: 'sk-kong', name: 'Kong Gateway', level: 'INTERMEDIATE', category: 'DevOps', yearsOfExperience: 2, projectsCount: 3, description: 'API gateway configuration for routing, CORS, and rate limiting.' },
          { id: 'sk-gcp', name: 'GCP', level: 'INTERMEDIATE', category: 'DevOps', yearsOfExperience: 2, projectsCount: 4, description: 'Cloud Run, Cloud SQL, and Pub/Sub on Google Cloud Platform.' },
        ],
      },
      {
        name: 'AI / ML',
        skills: [
          { id: 'sk-gemini', name: 'Gemini API', level: 'INTERMEDIATE', category: 'AI / ML', yearsOfExperience: 1, projectsCount: 2, description: 'Integrated Gemini into banking AI tools at Accenture.' },
          { id: 'sk-lc', name: 'LangChain', level: 'INTERMEDIATE', category: 'AI / ML', yearsOfExperience: 1, projectsCount: 2, description: 'LLM-powered application pipelines with Python.' },
        ],
      },
    ],
  },

  projects: [
    {
      id: 'proj-1',
      name: 'Resume Web',
      description: 'Cinematic full-stack resume website with a 3D floating workspace experience, Kong API Gateway, Valkey cache, and clean architecture.',
      startDate: '2026-07-01',
      endDate: null,
      technologies: ['React', 'TypeScript', 'Three.js', 'Node.js', 'Kong', 'Valkey', 'Docker', 'PostgreSQL'],
      links: { url: 'https://www.teerapon.space/resume', github: 'https://github.com/teerapon19/resume-web' },
      architecture: [
        {
          id: 'arch-1-fe', name: 'Frontend', nodeType: 'frontend', order: 0,
          responsibilities: ['Render the 3D workspace experience', 'Handle scroll-driven narrative and stage transitions'],
          challenges: ['Keeping 60 FPS with a rich 3D scene and HTML overlays'],
          solutions: ['Instanced meshes, lazy Suspense loading, React Query caching'],
          technologies: ['React', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion'],
        },
        {
          id: 'arch-1-gw', name: 'API Gateway', nodeType: 'gateway', order: 1,
          responsibilities: ['Single entry point for all API traffic', 'CORS, rate limiting, and routing'],
          challenges: ['Keeping gateway config in sync with backend routes'],
          solutions: ['Declarative kong.yml checked into version control'],
          technologies: ['Kong Gateway'],
        },
        {
          id: 'arch-1-be', name: 'Backend', nodeType: 'backend', order: 2,
          responsibilities: ['Serve resume data via REST endpoints', 'Enforce clean architecture boundaries'],
          challenges: ['Avoiding duplicate queries across nested resources'],
          solutions: ['Repository layer with per-entity caching', 'Zod validation at the controller boundary'],
          technologies: ['Node.js', 'Fastify', 'TypeScript', 'Prisma'],
        },
        {
          id: 'arch-1-cache', name: 'Redis / Valkey', nodeType: 'cache', order: 3,
          responsibilities: ['Cache frequently requested resume data', 'Reduce database load'],
          challenges: ['Stale data after content updates'],
          solutions: ['Short TTL with explicit cache-flush during content edits'],
          technologies: ['Valkey', 'ioredis'],
        },
        {
          id: 'arch-1-db', name: 'PostgreSQL', nodeType: 'database', order: 4,
          responsibilities: ['Durable storage for profile, experience, skills, and projects'],
          challenges: ['Modelling one-to-many resume sections cleanly'],
          solutions: ['Normalized schema with Prisma migrations'],
          technologies: ['PostgreSQL', 'Prisma'],
        },
        {
          id: 'arch-1-cloud', name: 'Docker / Cloud', nodeType: 'cloud', order: 5,
          responsibilities: ['Package and run every service consistently across environments'],
          challenges: ['Local dev parity with production'],
          solutions: ['docker-compose for all services with health checks'],
          technologies: ['Docker', 'Docker Compose'],
        },
      ],
    },
    {
      id: 'proj-2',
      name: 'Digital Wallet iOS',
      description: 'Native iOS digital wallet app with secure biometric auth, transaction history, and real-time balance updates.',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      technologies: ['Swift', 'SwiftUI', 'Combine', 'Core Data', 'Biometrics'],
      links: { url: null, github: 'https://github.com/teerapon19/digital-wallet-ios' },
      architecture: [
        {
          id: 'arch-2-ui', name: 'SwiftUI Layer', nodeType: 'frontend', order: 0,
          responsibilities: ['Wallet UI, animations, biometric auth prompt'],
          challenges: ['Smooth 60 FPS animations with real-time data'],
          solutions: ['Combine publishers, async/await, lazy stacks'],
          technologies: ['SwiftUI', 'Combine'],
        },
        {
          id: 'arch-2-api', name: 'REST API', nodeType: 'backend', order: 1,
          responsibilities: ['Transaction processing and balance queries'],
          challenges: ['Idempotent transaction handling'],
          solutions: ['UUID-keyed idempotency layer in Go backend'],
          technologies: ['Go', 'Fiber'],
        },
        {
          id: 'arch-2-db', name: 'PostgreSQL', nodeType: 'database', order: 2,
          responsibilities: ['Persistent transaction ledger'],
          challenges: ['High-concurrency concurrent writes without double-spend'],
          solutions: ['Serializable transactions with advisory locks'],
          technologies: ['PostgreSQL'],
        },
      ],
    },
    {
      id: 'proj-3',
      name: 'Currency Rate Alert API',
      description: 'Microservice that polls live exchange rates and fires webhooks or emails when user-defined thresholds are crossed.',
      startDate: '2024-09-01',
      endDate: '2024-12-31',
      technologies: ['Go', 'Fiber', 'PostgreSQL', 'Redis', 'Docker'],
      links: { url: null, github: 'https://github.com/teerapon19/currency-rate-alert' },
      architecture: [
        {
          id: 'arch-3-svc', name: 'Alert Service', nodeType: 'backend', order: 0,
          responsibilities: ['Poll exchange rate APIs every minute', 'Evaluate threshold rules and emit alerts'],
          challenges: ['Avoiding duplicate alerts on repeated threshold breaches'],
          solutions: ['Alert cooldown stored in Redis with TTL'],
          technologies: ['Go', 'Fiber'],
        },
        {
          id: 'arch-3-cache', name: 'Redis', nodeType: 'cache', order: 1,
          responsibilities: ['Rate caching and alert cooldown tracking'],
          challenges: ['Cache invalidation timing with live rate feeds'],
          solutions: ['Short 60-second TTL aligned with poll interval'],
          technologies: ['Redis'],
        },
        {
          id: 'arch-3-db', name: 'PostgreSQL', nodeType: 'database', order: 2,
          responsibilities: ['Persist user rules, thresholds, and alert history'],
          challenges: ['Efficient time-series querying for alert history'],
          solutions: ['Partial index on alert timestamp'],
          technologies: ['PostgreSQL'],
        },
      ],
    },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Observability with Grafana, Prometheus, Loki, Alloy and Tempo',
      issuer: 'Udemy',
      issueDate: '2024-02-01',
      expiryDate: null,
      credentialId: 'UC-2069189f-9019-4c22-8b8f-827b097f4b0a',
      url: 'https://www.udemy.com/certificate/UC-2069189f-9019-4c22-8b8f-827b097f4b0a/',
    },
    {
      id: 'cert-2',
      name: 'LangChain – Develop LLM powered applications',
      issuer: 'Udemy',
      issueDate: '2024-02-01',
      expiryDate: null,
      credentialId: null,
      url: null,
    },
    {
      id: 'cert-3',
      name: 'gRPC [Golang] Master Class: Build Modern API & Microservices',
      issuer: 'Udemy',
      issueDate: '2022-06-01',
      expiryDate: null,
      credentialId: 'UC-541e0b92-298c-4570-86d8-2d17e9e99c21',
      url: 'https://www.udemy.com/certificate/UC-541e0b92-298c-4570-86d8-2d17e9e99c21/',
    },
  ],

  articles: [
    {
      id: 'art-1',
      title: 'Building a Cinematic 3D Portfolio with React Three Fiber',
      slug: 'cinematic-3d-portfolio-r3f',
      excerpt: 'Lessons learned choreographing camera movement with GSAP inside a React Three Fiber scene.',
      content:
        'A look at structuring reusable 3D scene components, driving camera timelines with GSAP ScrollTrigger, and keeping frame rate high with stylized low-poly geometry. The key insight: treat the narrative timeline as a single scroll progress value (0..1) and map every animation to a local window within that range.',
      coverImage: null,
      tags: ['three.js', 'react-three-fiber', 'gsap'],
      publishedAt: '2026-06-30',
    },
    {
      id: 'art-2',
      title: 'Designing a Clean Architecture Resume API',
      slug: 'clean-architecture-resume-api',
      excerpt: 'How I structured a Fastify + Prisma backend into domain, application, and infrastructure layers.',
      content:
        'A walkthrough of splitting a small resume API into domain entities, use-case services, and infrastructure repositories so business logic never depends on Prisma directly. The payoff: swapping the ORM or adding a new adapter requires zero changes to service code.',
      coverImage: null,
      tags: ['architecture', 'backend', 'nodejs'],
      publishedAt: '2026-03-10',
    },
    {
      id: 'art-3',
      title: 'Caching Strategy with Valkey in Front of PostgreSQL',
      slug: 'caching-strategy-valkey-postgresql',
      excerpt: 'Practical patterns for TTL-based caching, cache keys, and invalidation on write.',
      content:
        'Notes on choosing cache keys per resource, setting sane TTLs, and manually flushing cache entries when content changes to avoid stale reads. Covers key namespacing, serialisation, and the pitfalls of caching paginated responses.',
      coverImage: null,
      tags: ['redis', 'valkey', 'performance'],
      publishedAt: '2026-04-22',
    },
  ],
}
