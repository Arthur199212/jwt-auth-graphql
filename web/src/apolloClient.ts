import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink
} from '@apollo/client'
import { getAccessToken } from './auth'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken()

  operation.setContext({
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
