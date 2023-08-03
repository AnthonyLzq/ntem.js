import { FastifyInstance } from 'fastify'
import { HttpError } from 'http-errors'

import { response } from './response'
import { Home, Docs } from './routes'

const routers = [Home]
const applyRoutes = async (app: FastifyInstance) => {
  routers.forEach(router => router(app))
  await Docs(app)

  // Handling 404 error
  app.setNotFoundHandler((request, reply) => {
    response({
      error: true,
      message: 'This route does not exists',
      reply,
      status: 404
    })
  })
  app.setErrorHandler<HttpError>((error, request, reply) => {
    response({
      error: true,
      message: error.message,
      reply,
      status: error.status ?? 500
    })
  })
}

export { applyRoutes }
