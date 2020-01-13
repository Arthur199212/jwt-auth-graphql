import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Register, Login, Home } from '../'
import { refreshAccessToken, setAccessToken } from '../../auth'
import { LOGOUT } from './queries'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [logout, { client }] = useMutation(LOGOUT)

  useEffect(() => {
    refreshAccessToken()
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
  <Router>
    <header>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/Login'>Login</Link>
        </li>
        <li>
          <button
            onClick={async () => {
              try {
                await logout()
                setAccessToken('')
                await client?.resetStore()
              } catch (err) {
                console.log(err.message)
              }
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </header>
    
    <Switch>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
    </Switch>
  </Router>
)}

export default App
