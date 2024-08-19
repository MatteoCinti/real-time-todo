import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const { VITE_BACKEND_URL, VITE_WS_URL } = import.meta.env;
console.log('🚀 ~ VITE_WS_URL:', VITE_WS_URL);

const httpLink = new HttpLink({
  uri: `${VITE_BACKEND_URL}/graphql`
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${VITE_WS_URL}/graphql`
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as any,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
