import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { REGISTER } from './queries'
import { RouteComponentProps } from 'react-router-dom'

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, { data }] = useMutation(REGISTER)

  return (
    <>
      <div>Register Form</div>

      <form onSubmit={async e => {
        e.preventDefault()
        try {
          const res = await register({ variables: { email, password } })
          console.log('responce', res)
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
        <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default Register
