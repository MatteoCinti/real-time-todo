import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const { VITE_BACKEND_URL, VITE_WS_URL } = import.meta.env;

const httpLink = new HttpLink({
  uri: `${VITE_BACKEND_URL}/graphql`
});

export const wsClient = createClient({
  url: `${VITE_WS_URL}/graphql`,
  retryAttempts: 10
});

export const wsLink = new GraphQLWsLink(wsClient);

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
