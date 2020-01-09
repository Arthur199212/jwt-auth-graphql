import { gql } from 'apollo-boost'

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!){
    register(email: $email, password: $password) {
      id
    }
  }
`
