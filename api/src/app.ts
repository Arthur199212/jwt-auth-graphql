import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { refreshToken } from './routes'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))

  app.use(express.json())

  app.use(cookieParser())

  app.use(refreshToken)

  return app
}
