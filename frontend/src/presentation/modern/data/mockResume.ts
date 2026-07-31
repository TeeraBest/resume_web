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

  projects: [
    {
      id: 'proj-app2app-authen',
      name: 'App2AppAuthen',
      description:
        'Secure app-to-app authentication flow for Bangkok Bank that improved login security and kept the handoff experience smooth across mobile banking journeys.',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      technologies: ['SwiftUI', 'Jetpack Compose', 'Deep Linking', 'Go', 'C#', 'Azure DevOps'],
      links: { url: null, github: null },
      architecture: [
        {
          id: 'arch-app2app-mobile',
          name: 'Mobile Auth Flow',
          nodeType: 'frontend',
          order: 0,
          responsibilities: [
            'Render authentication screens and approval states in iOS and Android',
            'Handle cross-app redirect and return flow with deep links',
          ],
          challenges: [
            'Keep auth handoff clear when control moves between two apps',
            'Avoid broken state when users cancel or background the flow',
          ],
          solutions: [
            'Built a mock testing app to verify every auth path',
            'Used deep-link routing with explicit success, cancel, and retry states',
          ],
          technologies: ['SwiftUI', 'Jetpack Compose', 'Deep Linking'],
        },
        {
          id: 'arch-app2app-api',
          name: 'Backend API',
          nodeType: 'backend',
          order: 1,
          responsibilities: [
            'Validate auth requests and issue response payloads for the mobile clients',
            'Support secure handoff between source app and banking app',
          ],
          challenges: [
            'Coordinate payload compatibility across two mobile apps',
            'Keep the contract stable while mobile UX kept evolving',
          ],
          solutions: [
            'Defined clear request and response DTOs for each auth step',
            'Added server-side validation to reject malformed or stale requests',
          ],
          technologies: ['Go', 'C#', 'RESTful API'],
        },
        {
          id: 'arch-app2app-sec',
          name: 'Security Layer',
          nodeType: 'security',
          order: 2,
          responsibilities: [
            'Protect user authentication during app handoff',
            'Reduce login friction without weakening security controls',
          ],
          challenges: [
            'Balance stronger security with seamless user experience',
            'Prevent spoofed redirects or invalid callbacks',
          ],
          solutions: [
            'Used signed handoff data and strict redirect validation',
            'Kept auth state short-lived and verified on every callback',
          ],
          technologies: ['Secure Deep Links', 'Authentication'],
        },
      ],
    },
    {
      id: 'proj-trip-space',
      name: 'Trip Space',
      description:
        'Trip expense management feature in Bangkok Bank mobile banking where I delivered the web experience inside native iOS and Android via WebView and a JavaScript-to-native bridge for device capabilities and app-level interactions.',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      technologies: ['JavaScript', 'WebView', 'SwiftUI', 'Jetpack Compose', 'Deep Linking', 'RESTful API'],
      links: { url: null, github: null },
      architecture: [
        {
          id: 'arch-trip-web',
          name: 'Web Trip Experience',
          nodeType: 'frontend',
          order: 0,
          responsibilities: [
            'Render Trip Space journey (My Trip and Group Trip) as a web module inside mobile banking',
            'Support expense tracking, summary views, and split-expense interactions from the web layer',
          ],
          challenges: [
            'Keep UI and behavior consistent when embedded in both iOS and Android containers',
            'Maintain smooth navigation and state when users move between native screens and web screens',
          ],
          solutions: [
            'Built responsive web screens optimized for in-app WebView rendering',
            'Defined clear route/state handling for entry, return, and refresh scenarios',
          ],
          technologies: ['JavaScript', 'WebView', 'Responsive Web'],
        },
        {
          id: 'arch-trip-bridge',
          name: 'JavaScript-Native Bridge',
          nodeType: 'integration',
          order: 1,
          responsibilities: [
            'Provide a message bridge so web pages can request native resources and native actions',
            'Coordinate callback flows from native back to web for result handling',
          ],
          challenges: [
            'Design a stable cross-platform bridge contract shared by web, iOS, and Android teams',
            'Prevent race conditions and mismatched callback states across async operations',
          ],
          solutions: [
            'Introduced command-based JavaScript bridge messages with typed payloads',
            'Used correlation IDs and standardized success/failure callbacks for reliable web-native communication',
          ],
          technologies: ['JavaScript Bridge', 'SwiftUI', 'Jetpack Compose'],
        },
        {
          id: 'arch-trip-services',
          name: 'Data and Service Integration',
          nodeType: 'backend',
          order: 2,
          responsibilities: [
            'Integrate web trip flows with backend APIs for trip data, expenses, and summaries',
            'Ensure mobile session context and web requests stay synchronized',
          ],
          challenges: [
            'Keep API interactions resilient in mobile network conditions',
            'Align release timing and API compatibility across multiple teams',
          ],
          solutions: [
            'Implemented defensive request handling and user-friendly fallback states in web flows',
            'Worked with platform teams on versioned contracts and rollout validation',
          ],
          technologies: ['RESTful API', 'Mobile Integration'],
        },
      ],
    },
    {
      id: 'proj-rate-alert',
      name: 'Currency Rate Alert',
      description:
        'Real-time exchange rate alert feature on iOS and Android that let users define thresholds and receive push notifications when rates crossed the target value.',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      technologies: ['SwiftUI', 'Jetpack Compose', 'Go', 'C#', 'Push Notifications', 'Azure DevOps'],
      links: { url: null, github: null },
      architecture: [
        {
          id: 'arch-rate-mobile',
          name: 'Mobile UI',
          nodeType: 'frontend',
          order: 0,
          responsibilities: [
            'Let users set target exchange rates and notification preferences',
            'Present live rate updates and alert history clearly',
          ],
          challenges: [
            'Make rate configuration simple on small screens',
            'Keep UI responsive while rates update in real time',
          ],
          solutions: [
            'Designed focused forms for buy and sell alert setup',
            'Used lightweight state updates for live rate refreshes',
          ],
          technologies: ['SwiftUI', 'Jetpack Compose'],
        },
        {
          id: 'arch-rate-api',
          name: 'Alert Service',
          nodeType: 'backend',
          order: 1,
          responsibilities: [
            'Evaluate user thresholds against current exchange rates',
            'Trigger notification events when a rule matches',
          ],
          challenges: [
            'Avoid duplicate alerts when the same threshold is crossed repeatedly',
            'Keep polling and notification timing predictable',
          ],
          solutions: [
            'Added rule evaluation and alert state tracking on the server',
            'Integrated push notification delivery after threshold match',
          ],
          technologies: ['Go', 'C#', 'RESTful API'],
        },
        {
          id: 'arch-rate-notify',
          name: 'Notification Layer',
          nodeType: 'notification',
          order: 2,
          responsibilities: [
            'Deliver push notifications when alerts fire',
            'Keep alert history visible in the app',
          ],
          challenges: [
            'Make sure notification delivery stays aligned with user preferences',
            'Handle alerts that arrive while the app is backgrounded',
          ],
          solutions: [
            'Used server-side push notification integration',
            'Kept history synchronized so users could audit alert events',
          ],
          technologies: ['Push Notifications', 'Mobile'],
        },
      ],
    },
    {
      id: 'proj-digital-wallet',
      name: 'Digital Wallet',
      description:
        'Compliant digital wallet solution for a national government payment initiative, delivered on both iOS and Android with mobile UI, payment APIs, and regulatory constraints in mind.',
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      technologies: ['SwiftUI', 'Jetpack Compose', 'Go', 'C#', 'Payment APIs', 'Compliance'],
      links: { url: null, github: null },
      architecture: [
        {
          id: 'arch-wallet-ui',
          name: 'Wallet UI',
          nodeType: 'frontend',
          order: 0,
          responsibilities: [
            'Show wallet balances, payment status, and transaction screens',
            'Support a clear UX for government-backed payment flows',
          ],
          challenges: [
            'Keep the wallet flow understandable for broad user groups',
            'Handle payment states cleanly when transactions are pending or failed',
          ],
          solutions: [
            'Built native interfaces in SwiftUI and Jetpack Compose',
            'Focused on strong visual hierarchy for balances and payment confirmation',
          ],
          technologies: ['SwiftUI', 'Jetpack Compose'],
        },
        {
          id: 'arch-wallet-api',
          name: 'Payment API',
          nodeType: 'backend',
          order: 1,
          responsibilities: [
            'Process wallet transactions and retrieve payment status',
            'Expose reliable APIs for mobile payment flows',
          ],
          challenges: [
            'Keep mobile and backend contracts stable during policy changes',
            'Ensure payment results are accurate and traceable',
          ],
          solutions: [
            'Integrated mobile clients with server-side payment APIs',
            'Kept the flow auditable for compliance and support',
          ],
          technologies: ['Go', 'C#', 'RESTful API'],
        },
        {
          id: 'arch-wallet-compliance',
          name: 'Compliance Layer',
          nodeType: 'security',
          order: 2,
          responsibilities: [
            'Keep the wallet solution aligned with regulatory requirements',
            'Support safe rollout for a national payment initiative',
          ],
          challenges: [
            'Balance usability with strict compliance needs',
            'Avoid inconsistencies across devices and app versions',
          ],
          solutions: [
            'Validated flows against business and regulatory constraints',
            'Coordinated release readiness with internal stakeholders',
          ],
          technologies: ['Compliance', 'Mobile Payments'],
        },
      ],
    },
  ],

  certifications: [],

  articles: [
    {
      id: 'article-github',
      title: 'GitHub',
      slug: 'github',
      excerpt: 'Explore my code repositories and active projects on GitHub.',
      content: 'GitHub: https://github.com/TeeraBest',
      coverImage: null,
      tags: ['github', 'code', 'portfolio'],
      publishedAt: '2026-08-01',
    },
    {
      id: 'article-linkedin',
      title: 'LinkedIn',
      slug: 'linkedin',
      excerpt: 'View my professional background and career timeline on LinkedIn.',
      content: 'LinkedIn: https://www.linkedin.com/in/teerapon-jeamphue-35749a135',
      coverImage: null,
      tags: ['linkedin', 'career', 'profile'],
      publishedAt: '2026-08-01',
    },
    {
      id: 'article-website',
      title: 'Personal Website',
      slug: 'personal-website',
      excerpt: 'Visit my interactive resume website and project showcase.',
      content: 'Website: https://teerabest.github.io/resume_web/',
      coverImage: null,
      tags: ['website', 'resume', 'showcase'],
      publishedAt: '2026-08-01',
    },
  ],
}
