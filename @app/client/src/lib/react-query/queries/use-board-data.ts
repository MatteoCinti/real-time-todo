import { useQuery } from '@tanstack/react-query';

import { useGetUserToken } from '~/hooks';
import { gqlRequestClient } from '~/lib/graphql';
import {
  GetBoardDataDocument,
  GetBoardDataQueryVariables
} from '~/lib/graphql/__generated__/graphql';

import { UseBoardData } from '../types';
import { boardDataQueryKeys } from './query-keys';

function useBoardData(variables: GetBoardDataQueryVariables) {
  const token = useGetUserToken();

  return useQuery({
    queryKey: boardDataQueryKeys(token, variables),
    queryFn: async () => {
      const response = await gqlRequestClient({
        Authorization: `Bearer ${token}`
      }).request(GetBoardDataDocument, variables);
      return {
        board: response.getBoard
      } as UseBoardData;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}

export default useBoardData;
