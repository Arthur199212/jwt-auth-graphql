import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    hello: String!
  }

  type Mutation {
    register(email: String!, password: String!): User
  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
`
