import Fastify from 'fastify'
import cors from '@fastify/cors'
import helmet from '@fastify/helmet'
import { getPrismaClient, disconnectPrisma } from './infrastructure/database/prisma.client'
import { disconnectValkey } from './infrastructure/cache/valkey.client'
import { ResumeRepository } from './infrastructure/repositories/resume.repository'
import { ResumeService } from './application/services/resume.service'
import { ResumeController } from './presentation/controllers/resume.controller'
import { registerResumeRoutes } from './presentation/routes/resume.routes'

const PORT = Number(process.env.PORT ?? 3001)
const HOST = '0.0.0.0'
const isDev = process.env.NODE_ENV !== 'production'

async function bootstrap() {
  const fastify = Fastify({
    logger: {
      level: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
    },
  })

  await fastify.register(helmet, { contentSecurityPolicy: false })
  await fastify.register(cors, { origin: '*' })

  // Swagger UI - development only (disabled for debugging)
  if (isDev) {
    const swagger = await import('@fastify/swagger')
    const swaggerUi = await import('@fastify/swagger-ui')
    const { swaggerConfig, swaggerUiConfig } = await import('./presentation/swagger')

    await fastify.register(swagger.default, swaggerConfig)
    await fastify.register(swaggerUi.default, swaggerUiConfig)
    fastify.log.info('Swagger UI enabled at http://localhost:3001/docs')
  }

  fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))

  // Dependency injection — wire up clean architecture layers
  const db = getPrismaClient()
  const resumeRepo = new ResumeRepository(db)
  const resumeService = new ResumeService(resumeRepo)
  const resumeController = new ResumeController(resumeService)

  registerResumeRoutes(fastify, resumeController)

  fastify.setErrorHandler((error, _req, reply) => {
    fastify.log.error(error)
    reply.status(500).send({ success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } })
  })

  fastify.setNotFoundHandler((_req, reply) => {
    reply.status(404).send({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } })
  })

  const gracefulShutdown = async (signal: string) => {
    fastify.log.info(`Received ${signal}, shutting down...`)
    await fastify.close()
    await disconnectPrisma()
    await disconnectValkey()
    process.exit(0)
  }

  process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

  await fastify.listen({ port: PORT, host: HOST })
  fastify.log.info(`Server running on http://${HOST}:${PORT}`)
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
