import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_USERS } from './queries'
import { refreshAccessToken } from '../../auth'

interface UserDocument {
  id: string,
  email: string,
  createdAt?: string,
  updatedAt?: string
}

const Home: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only'
  })

  if (error) refreshAccessToken(refetch) // TODO create a middleware to handle it

  if (!data || loading || error) return <div>Home Page</div>

  return (
    <>
      <div>Home Page</div>

       <h3>Users</h3>

       <ul>
        {data.users.map(({ id, email }: UserDocument) => (
          <li key={id}>
            {email}
          </li>
        ))}
       </ul>
    </>
  )
}

export default Home
