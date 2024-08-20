import { ApolloServer } from '@apollo/server';

import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { typeDefs, resolvers, mocks } from '..';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const testServer = new ApolloServer({
  schema: addMocksToSchema({ schema, mocks })
});

export default testServer;
