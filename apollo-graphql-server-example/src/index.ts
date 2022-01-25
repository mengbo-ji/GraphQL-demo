import { ApolloServer, gql } from 'apollo-server';

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

// 3. 创建 apollo 实例
const server = new ApolloServer({ typeDefs, resolvers });


server.listen(1234).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
