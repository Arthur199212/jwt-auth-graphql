import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!){
    register(email: $email, password: $password) {
      id
    }
  }
`
