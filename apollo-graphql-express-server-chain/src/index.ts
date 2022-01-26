import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // GraphQL 请求都会经过这里
    // 该函数接收一个对象，Request
    context: (req) => {
      return {
        foo: 'bar', // 返回自定义数据，后续的每个resolvers 都可以获取
      }
    }
  });

  await server.start();

  server.applyMiddleware({ app });

  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  app.listen(1234, () => console.log(`🚀 Server ready at http://localhost:1234${server.graphqlPath}`))
  ;
}

startApolloServer()