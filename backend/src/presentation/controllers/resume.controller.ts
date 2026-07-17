import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import type { ResumeService } from '../../application/services/resume.service'
import { NotFoundError } from '../../application/services/resume.service'

const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
})

function successResponse<T>(data: T, extra?: Record<string, unknown>) {
  return {
    success: true,
    data,
    meta: { cached: false, timestamp: new Date().toISOString(), ...extra },
  }
}

function errorResponse(code: string, message: string) {
  return { success: false, error: { code, message } }
}

export class ResumeController {
  constructor(private readonly service: ResumeService) {}

  async getFullResume(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getFullResume(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getProfile(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getExperiences(req: FastifyRequest, reply: FastifyReply) {
    try {
      const parsed = paginationSchema.safeParse(req.query)
      if (!parsed.success) {
        return reply.status(400).send(errorResponse('VALIDATION_ERROR', parsed.error.message))
      }
      const { limit, offset } = parsed.data
      const profileId = await this.service.resolveProfileId()
      const result = await this.service.getExperiences(profileId, limit, offset)
      reply.send(successResponse(result.data, { total: result.total }))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getEducation(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getEducation(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getSkills(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getSkills(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getProjects(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getProjects(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getCertifications(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getCertifications(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getArticles(req: FastifyRequest, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getArticles(profileId)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  async getArticleBySlug(req: FastifyRequest<{ Params: { slug: string } }>, reply: FastifyReply) {
    try {
      const profileId = await this.service.resolveProfileId()
      const data = await this.service.getArticleBySlug(profileId, req.params.slug)
      reply.send(successResponse(data))
    } catch (err) {
      this.handleError(err, reply)
    }
  }

  private handleError(err: unknown, reply: FastifyReply) {
    if (err instanceof NotFoundError) {
      return reply.status(404).send(errorResponse('NOT_FOUND', err.message))
    }
    console.error('[ResumeController]', err)
    reply.status(500).send(errorResponse('INTERNAL_ERROR', 'An unexpected error occurred'))
  }
}
