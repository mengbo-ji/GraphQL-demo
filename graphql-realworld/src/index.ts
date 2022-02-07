// @ts-nocheck
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  server.applyMiddleware({ app });
  app.listen(1234, () => console.log(`🚀 Server ready at http://localhost:1234${server.graphqlPath}`))
  ;
}

startApolloServer()