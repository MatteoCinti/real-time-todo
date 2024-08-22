import { useQuery } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';
import {
  GetUserDataDocument,
  GetUserDataQueryVariables
} from '~/lib/graphql/__generated__/graphql';

function useUser(variables: GetUserDataQueryVariables) {
  return useQuery({
    queryKey: ['user', GetUserDataDocument, variables],
    queryFn: async () => {
      const response = await gqlRequestClient.request(
        GetUserDataDocument,
        variables
      );
      return {
        user: response.getUser,
        boards: response.getBoards
      };
    }
  });
}

export default useUser;
