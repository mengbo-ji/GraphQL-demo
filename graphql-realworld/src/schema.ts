import { gql } from 'apollo-server-express'
// 1. 定义 apollo schema
const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    age: Int
  }

  type Query {
    users: [ User! ]
    user(id: ID!): User
  }

`;

// 2. 定义resolvers
const resolvers = {
  Query: {
    // async users(parent: any, args: any, context: any) {
    //   const users = await User.find()
    //   return users
    // },
    // async user(parent: any, { id }: any) {
    //   const user = await User.findById(id)
    //   return user
    // }
    async users(parent: any, args: any, { dataSources }: any) {
      const users = await dataSources.users.getUsers()
      return users
    },
    async user(parent: any, { id }: any, { dataSources }: any) {
      const user = await dataSources.users.getUser(id)
      return user
    }
  },

};

export {
  typeDefs,
  resolvers
}