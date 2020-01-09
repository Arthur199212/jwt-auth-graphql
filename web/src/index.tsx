import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from './components'

// TODO move apollo logic in a sepparate file

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token')

  if (!token) return forward(operation)

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${JSON.parse(token)}` : ''
    }
  })

  return forward(operation)
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
