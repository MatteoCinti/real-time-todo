import 'dotenv/config';
import express, { Express } from 'express';
import { createServer } from 'http';
import cors from 'cors';

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from '@apollo/server';

import { resolvers } from './lib/graphql/resolvers/k';
import typeDefs from './lib/graphql/type-defs';

const app: Express = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<ApolloContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ],
  cache: undefined
});

async function initServer() {
  await server.start();

  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          token: req.headers.authorization,
          guest: req.headers.guest
        };
      }
    })
  );
  app.use('/checkConnections', (_, res) => {
    res.json({ serverTime: new Date().toISOString() });
  });

  await httpServer.listen({ port: process.env.PORT, host: '0.0.0.0' });
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

initServer().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
