import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { App } from './components'

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' })

const authLink = new ApolloLink((operation, forward) => {
  // const token = localStorage.getItem('auth_token')
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTE2Y2RiMTc0OGE5OTMzMDQ5MGQ3NjYiLCJpYXQiOjE1Nzg1NTM1MTQsImV4cCI6MTU3OTQ1MzUxNH0.NKRWKW2m9IRw2EhcLnn4obS4HWPVKQc91aEeZVDrzvs'

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
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
