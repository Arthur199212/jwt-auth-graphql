import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Register, Login, Home } from '../'
import { URL_REFRESH_TOKEN, setAccessToken } from '../../auth'

const App: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(URL_REFRESH_TOKEN, {
      credentials: 'include',
      method: 'POST'
    })
      .then(async res => {
        const { accessToken } = await res.json()

        setAccessToken(accessToken)

        setLoading(false)
      })
      .catch(err => console.log(err))
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
