import express from 'express'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')

  app.use(express.json())

  return app
}
