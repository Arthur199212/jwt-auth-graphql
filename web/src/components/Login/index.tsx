import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LOGIN } from './queries'
import { setAccessToken } from '../../auth'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const [login] = useMutation(LOGIN)
  // TODO error handling
  // TODO form as a separate component
  // TODO form validation

  return (
    <>
      <div>Login Form</div>

      <form onSubmit={async e => {
        e.preventDefault()
        try {
          const res = await login({ variables: { email, password } })

          const accessToken = res.data.login.accessToken

          setAccessToken(accessToken)

          setEmail('')
          setPassword('')
          history.push('/')
        } catch (err) {
          console.log(err)
        }
      }}>
        <div>
          <input
            type='email'
            placeholder='email'
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value)
            }}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value)
            }}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login
