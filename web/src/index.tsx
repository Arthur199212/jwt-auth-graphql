import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import apolloClient from './apolloClient'
import { App } from './components'

render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
