import type { FastifyInstance } from 'fastify'
import type { ResumeController } from '../controllers/resume.controller'
import {
  resumeEndpointSchema,
  profileEndpointSchema,
  experienceEndpointSchema,
  educationEndpointSchema,
  skillsEndpointSchema,
  projectsEndpointSchema,
  certificationsEndpointSchema,
} from '../swagger'

export function registerResumeRoutes(fastify: FastifyInstance, controller: ResumeController) {
  const prefix = '/api/v1/resume'

  fastify.get(prefix, { schema: resumeEndpointSchema }, (req, reply) => controller.getFullResume(req, reply))
  fastify.get(`${prefix}/profile`, { schema: profileEndpointSchema }, (req, reply) =>
    controller.getProfile(req, reply),
  )
  fastify.get(`${prefix}/experience`, { schema: experienceEndpointSchema }, (req, reply) =>
    controller.getExperiences(req, reply),
  )
  fastify.get(`${prefix}/education`, { schema: educationEndpointSchema }, (req, reply) =>
    controller.getEducation(req, reply),
  )
  fastify.get(`${prefix}/skills`, { schema: skillsEndpointSchema }, (req, reply) => controller.getSkills(req, reply))
  fastify.get(`${prefix}/projects`, { schema: projectsEndpointSchema }, (req, reply) =>
    controller.getProjects(req, reply),
  )
  fastify.get(`${prefix}/certifications`, { schema: certificationsEndpointSchema }, (req, reply) =>
    controller.getCertifications(req, reply),
  )
  fastify.get(`${prefix}/articles`, (req, reply) => controller.getArticles(req, reply))
  fastify.get(`${prefix}/articles/:slug`, (req, reply) => controller.getArticleBySlug(req as any, reply))
}
