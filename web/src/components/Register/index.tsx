import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { REGISTER } from './queries'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const [register] = useMutation(REGISTER)
  // TODO error handling
  // TODO form as a separate component
  // TODO form validation

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
