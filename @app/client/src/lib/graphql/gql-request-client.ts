import { GraphQLClient } from 'graphql-request';

type AuthHeaderProps = {
  authorization?: string;
};
console.log('🚀 ~ VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

const gqlRequestClient = new GraphQLClient(
  `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  {
    headers: () => {
      const authHeaders = {} as AuthHeaderProps;

      return {
        'Content-Type': 'application/json',
        ...authHeaders
      };
    }
  }
);

export default gqlRequestClient;
