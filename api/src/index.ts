import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { APP_PORT, MONGO_URI, MONGO_OPTIONS } from './config'
import { createApp } from './app'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

;(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    })
  
    const app = createApp()

    server.applyMiddleware({ app, path: '/graphql' })

    app.listen(APP_PORT, () => console.log(`Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`))
  } catch (err) {
    console.log(err)
  }
})()
