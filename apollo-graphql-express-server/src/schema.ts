import { gql } from 'apollo-server-express'
// 1. 定义 apollo schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
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

// 2. 定义resolvers
const resolvers = {
  // 查询入口
  Query: {
    books: () => books,
  },
};

export {
  typeDefs,
  resolvers
}