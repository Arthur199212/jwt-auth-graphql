import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { testQuery } from './queries'

const App: React.FC = () => {
  const { data, loading } = useQuery(testQuery)

  if (loading) {
    return <div>Loading...</div>
  }
  
  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

export default App
