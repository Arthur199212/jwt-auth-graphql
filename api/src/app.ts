import express from 'express'
import { serverError, notFound } from './middleware'

export const createApp = () => {
  const app = express()

  app.use(express.json())

  app.use(notFound)

  app.use(serverError)

  return app
}