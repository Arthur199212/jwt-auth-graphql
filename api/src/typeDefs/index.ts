import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    users: [User!]!
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): AccessToken
    logout: Boolean
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type AccessToken {
    accessToken: String!
  }
`
