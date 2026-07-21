import type { FullResume } from '@core/models/resume.model'

/**
 * Static mock data for the /resume_modern experience.
 * Swap this out (or replace the hook in ResumeModernPage) to use the real API.
 */
export const MOCK_RESUME: FullResume = {
  profile: {
    id: 'teerapon-jeamphue',
    fullName: 'Teerapon Jeamphue',
    title: 'Senior Mobile Engineer',
    summary:
      'Senior Mobile Engineer with 9+ years of experience building native iOS and Android applications for banking, fintech, digital wallets, and mobile payment products. Strong in SwiftUI, Jetpack Compose, secure app-to-app authentication, API integration, CI/CD, and end-to-end feature delivery.',
    email: 'bjteerapon@gmail.com',
    phone: '+66 957073791',
    location: 'Thailand 10540',
    resumeUrl: null,
    links: {
      linkedin: 'https://www.linkedin.com/in/teerapon-jeamphue-35749a135',
      github: 'https://github.com/TeeraBest',
      website: 'https://teerabest.github.io/resume_web/',
    },
  },

  experiences: [
    {
      id: 'exp-bbl-senior',
      company: 'Bangkok Bank (BBL)',
      position: 'Senior System Analyst (Mobile Engineer)',
      location: 'Bangkok, Thailand',
      startDate: '2025-06-01',
      endDate: null,
      isCurrent: true,
      description: 'Lead native mobile feature delivery for Bangkok Bank flagship mobile app across iOS and Android.',
      highlights: [
        'Lead design, development, testing, and deployment of SwiftUI and Jetpack Compose features',
        'Design and integrate Go and C# server-side APIs for mobile flows',
        'Own features end-to-end from requirements and technical design through production support',
        'Maintain Azure DevOps CI/CD pipelines for mobile builds, testing, and releases',
        'Build compliant digital wallet and App2App authentication flows',
      ],
    },
    {
      id: 'exp-bbl-analyst',
      company: 'Bangkok Bank (BBL)',
      position: 'System Analyst (Mobile Engineer)',
      location: 'Bangkok, Thailand',
      startDate: '2022-07-01',
      endDate: '2025-06-30',
      isCurrent: false,
      description: 'Developed and maintained Bangkok Bank mobile banking application across iOS and Android.',
      highlights: [
        'Developed mobile features using SwiftUI on iOS and Jetpack Compose on Android',
        'Collaborated with backend teams, product managers, and business stakeholders',
        'Delivered digital wallet, App2App authentication, and currency rate alert features',
      ],
    },
    {
      id: 'exp-utac',
      company: 'UTAC',
      position: 'CIM Engineer',
      location: 'Bangkok, Thailand',
      startDate: '2020-04-01',
      endDate: '2022-03-31',
      isCurrent: false,
      description: 'Designed software solutions to streamline semiconductor manufacturing processes.',
      highlights: [
        'Developed multi-job wafermap conversion software, reducing processing time by 30%',
        'Built web applications using Angular, React, and .NET Core',
        'Developed programs to communicate with manufacturing machines',
        'Managed project organization and reporting in Azure DevOps',
      ],
    },
    {
      id: 'exp-brinks',
      company: "Brink's Global Technology Limited",
      position: 'Web Developer',
      location: 'Bangkok, Thailand',
      startDate: '2019-02-01',
      endDate: '2020-04-30',
      isCurrent: false,
      description: 'Built enterprise logistics and money storage systems.',
      highlights: [
        'Engineered C# .NET MVC and RESTful API solutions',
        'Improved backend services, resulting in a 20% performance gain',
      ],
    },
    {
      id: 'exp-similan',
      company: 'Similan Technology',
      position: 'Android Developer',
      location: 'Bangkok, Thailand',
      startDate: '2017-01-01',
      endDate: '2020-02-29',
      isCurrent: false,
      description: 'Built warehouse management applications and backend APIs.',
      highlights: [
        'Built warehouse management applications using Android native and Ionic',
        'Designed and implemented backend APIs for better performance and maintainability',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'Christ University',
      degree: 'Bachelor of Science (BSc)',
      field: 'Computer, Mathematic and Electronics',
      startDate: '2012-08-01',
      endDate: '2016-05-01',
      gpa: null,
      description: 'Second-class honours.',
    },
  ],

  skills: {
    categories: [
      {
        name: 'Mobile',
        skills: [
          { id: 'sk-swiftui', name: 'SwiftUI', level: 'EXPERT', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-compose', name: 'Jetpack Compose', level: 'EXPERT', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-swift', name: 'Swift', level: 'EXPERT', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-kotlin', name: 'Kotlin', level: 'EXPERT', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-ios', name: 'iOS Development', level: 'EXPERT', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-android', name: 'Android Development', level: 'EXPERT', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-rn', name: 'React Native', level: 'INTERMEDIATE', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-flutter', name: 'Flutter', level: 'INTERMEDIATE', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-ionic', name: 'Ionic', level: 'ADVANCED', category: 'Mobile', yearsOfExperience: null, projectsCount: null, description: null },
        ],
      },
      {
        name: 'Backend / API',
        skills: [
          { id: 'sk-go', name: 'Go', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-csharp', name: 'C#', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-dotnet', name: '.NET', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-dotnetcore', name: '.NET Core', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-node', name: 'Node.js', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-webapi', name: 'Web API', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-mvc', name: 'MVC', level: 'ADVANCED', category: 'Backend / API', yearsOfExperience: null, projectsCount: null, description: null },
        ],
      },
      {
        name: 'Frontend',
        skills: [
          { id: 'sk-angular', name: 'Angular', level: 'ADVANCED', category: 'Frontend', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-angularjs', name: 'AngularJS', level: 'ADVANCED', category: 'Frontend', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-react', name: 'React', level: 'ADVANCED', category: 'Frontend', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-ts', name: 'TypeScript', level: 'ADVANCED', category: 'Frontend', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-js', name: 'JavaScript', level: 'ADVANCED', category: 'Frontend', yearsOfExperience: null, projectsCount: null, description: null },
        ],
      },
      {
        name: 'Databases',
        skills: [
          { id: 'sk-pg', name: 'PostgreSQL', level: 'ADVANCED', category: 'Databases', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-mssql', name: 'MS SQL', level: 'ADVANCED', category: 'Databases', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-mysql', name: 'MySQL', level: 'ADVANCED', category: 'Databases', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-oracle', name: 'Oracle', level: 'ADVANCED', category: 'Databases', yearsOfExperience: null, projectsCount: null, description: null },
        ],
      },
      {
        name: 'DevOps & Tools',
        skills: [
          { id: 'sk-docker', name: 'Docker', level: 'ADVANCED', category: 'DevOps & Tools', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-azure', name: 'CI/CD Pipelines (Azure DevOps)', level: 'ADVANCED', category: 'DevOps & Tools', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-git', name: 'Git', level: 'ADVANCED', category: 'DevOps & Tools', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-sonarq', name: 'SonarQ', level: 'INTERMEDIATE', category: 'DevOps & Tools', yearsOfExperience: null, projectsCount: null, description: null },
        ],
      },
      {
        name: 'Architecture',
        skills: [
          { id: 'sk-native', name: 'Native iOS & Android Development', level: 'EXPERT', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-clean', name: 'Clean Architecture', level: 'ADVANCED', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-mvvm', name: 'MVVM', level: 'ADVANCED', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-endtoend', name: 'End-to-End Solution Design', level: 'EXPERT', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-payments', name: 'Digital Payments & Wallets', level: 'EXPERT', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-auth', name: 'Secure Authentication (App2App)', level: 'EXPERT', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-scale', name: 'Large-Scale Mobile Systems', level: 'EXPERT', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-agile', name: 'Agile Development', level: 'ADVANCED', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-tdd', name: 'TDD', level: 'ADVANCED', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
          { id: 'sk-scrum', name: 'Scrum', level: 'ADVANCED', category: 'Architecture', yearsOfExperience: null, projectsCount: null, description: null },
        ],
      },
    ],
  },

  projects: [],

  certifications: [],

  articles: [],
}
