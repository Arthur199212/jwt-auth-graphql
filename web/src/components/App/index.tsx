import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { Register, Login, Home } from '../'

const App: React.FC = () => 
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

export default App
