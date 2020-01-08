import express from 'express'
import cookieParser from 'cookie-parser'
import { refreshToken } from './routes'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())

  app.use(cookieParser())

  app.use(refreshToken)

  return app
}
