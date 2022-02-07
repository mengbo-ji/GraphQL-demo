// @ts-nocheck
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'
import dataSources from './data-sources'

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  });

  await server.start();

  server.applyMiddleware({ app });
  app.listen(1234, () => console.log(`🚀 Server ready at http://localhost:1234${server.graphqlPath}`))
  ;
}

startApolloServer()