import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    foo: String
  }
`;