import express from 'express'
import cookieParser from 'cookie-parser'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())

  app.use(cookieParser())

  return app
}
