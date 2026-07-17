export const swaggerConfig = {
  swagger: {
    info: {
      title: 'Resume API',
      description: 'Full-stack resume website API',
      version: '1.0.0',
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      {
        name: 'Resume',
        description: 'Resume data endpoints',
      },
    ],
  },
}

export const swaggerUiConfig = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: async (_request: any, _reply: any) => {},
    preHandler: async (_request: any, _reply: any) => {},
  },
  staticCSP: true,
  transformStaticCSP: (header: string) => header,
  exposeRoute: true,
}

const successResponseMeta = {
  type: 'object',
  properties: {
    cached: { type: 'boolean' },
    timestamp: { type: 'string' },
  },
  required: ['cached', 'timestamp'],
}

const profileDataSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    fullName: { type: 'string' },
    title: { type: 'string' },
    summary: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    location: { type: 'string' },
    links: {
      type: 'object',
      properties: {
        linkedin: { type: 'string' },
        github: { type: 'string' },
        website: { type: 'string' },
      },
    },
  },
}

export const resumeEndpointSchema = {
  description: 'Get full resume with all sections',
  tags: ['Resume'],
  response: {
    200: {
      description: 'Full resume data',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            profile: profileDataSchema,
            experiences: { type: 'array' },
            education: { type: 'array' },
            skills: {
              type: 'object',
              properties: {
                categories: { type: 'array' },
              },
            },
            projects: { type: 'array' },
            certifications: { type: 'array' },
          },
        },
        meta: successResponseMeta,
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

export const profileEndpointSchema = {
  description: 'Get profile information',
  tags: ['Resume'],
  response: {
    200: {
      description: 'Profile data',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: profileDataSchema,
        meta: successResponseMeta,
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

export const experienceEndpointSchema = {
  description: 'Get work experience (paginated)',
  tags: ['Resume'],
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'number', default: 20 },
      offset: { type: 'number', default: 0 },
    },
  },
  response: {
    200: {
      description: 'Experience list',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'array' },
        meta: {
          type: 'object',
          properties: {
            cached: { type: 'boolean' },
            timestamp: { type: 'string' },
            total: { type: 'number' },
          },
        },
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

export const educationEndpointSchema = {
  description: 'Get education history',
  tags: ['Resume'],
  response: {
    200: {
      description: 'Education list',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'array' },
        meta: successResponseMeta,
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

export const skillsEndpointSchema = {
  description: 'Get skills grouped by category',
  tags: ['Resume'],
  response: {
    200: {
      description: 'Skills by category',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            categories: { type: 'array' },
          },
        },
        meta: successResponseMeta,
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

export const projectsEndpointSchema = {
  description: 'Get projects list',
  tags: ['Resume'],
  response: {
    200: {
      description: 'Projects list',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'array' },
        meta: successResponseMeta,
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

export const certificationsEndpointSchema = {
  description: 'Get certifications list',
  tags: ['Resume'],
  response: {
    200: {
      description: 'Certifications list',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'array' },
        meta: successResponseMeta,
      },
      required: ['success', 'data', 'meta'],
    },
  },
}

