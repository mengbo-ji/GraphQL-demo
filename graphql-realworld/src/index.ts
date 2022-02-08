// @ts-nocheck
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dataSources from './data-sources'
import schema from './schema'

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    schema,
    dataSources,
    context({ req }) {
      const token = req.headers.authorization
      return {
        token
      }
    },
  });

  await server.start();

  server.applyMiddleware({ app });
  app.listen(1234, () => console.log(`🚀 Server ready at http://localhost:1234${server.graphqlPath}`))
    ;
}

startApolloServer()