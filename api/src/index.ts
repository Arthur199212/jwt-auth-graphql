import mongoose from 'mongoose'
import { APP_PORT, MONGO_URI, MONGO_OPTIONS } from './config'
import { createApp } from './app'

;(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
  
    const app = createApp()

    app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}/`))
  } catch (err) {
    console.log(err)
  }
})()
