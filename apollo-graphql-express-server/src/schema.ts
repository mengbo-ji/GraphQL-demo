import { gql } from 'apollo-server-express'
// 1. 定义 apollo schema
const typeDefs = gql`

  type User {
    id: ID!
    name: String
  }

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
    numberSix: Int! # Should always return the number 6 when queried
    numberSeven: Int! # Should always return 7
    user(id: ID!): User
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const users = [
  {
    id: '1',
    name: 'Elizabeth Bennet'
  },
  {
    id: '2',
    name: 'Fitzwilliam Darcy'
  }
];


// 2. 定义resolvers
const resolvers = {
  // 查询入口
  Query: {
    books: () => books,
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
    user(parent: any, args: any, context: any, info: any) {
      return users.find(user => user.id === args.id);
    }
  },
};

export {
  typeDefs,
  resolvers
}