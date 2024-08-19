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

import { resolvers } from './providers/graphql/resolvers';
import typeDefs from './providers/graphql/type-defs';

const app: Express = express();
const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/graphql'
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ]
});

async function initServer() {
  await server.start();

  app.use('/graphql', cors(), express.json(), expressMiddleware(server));
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
