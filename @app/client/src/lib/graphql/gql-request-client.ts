import { GraphQLClient } from 'graphql-request';

type AuthHeaderProps = {
  Authorization?: string;
};

const gqlRequestClient = (headers?: AuthHeaderProps) =>
  new GraphQLClient(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
    headers: () => {
      return {
        'Content-Type': 'application/json',
        ...headers
      };
    }
  });

export default gqlRequestClient;
