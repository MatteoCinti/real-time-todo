import { useQuery } from '@tanstack/react-query';

import { useAuth, useGetUserToken } from '~/hooks';
import { gqlRequestClient } from '~/lib/graphql';
import {
  GetBoardDataDocument,
  GetBoardDataQueryVariables
} from '~/lib/graphql/__generated__/graphql';

import { UseBoardData } from '../types';
import { boardDataQueryKeys } from './query-keys';

function useBoardData(variables: GetBoardDataQueryVariables) {
  const token = useGetUserToken();
  const { guest } = useAuth();

  const headers: {
    Authorization?: string;
    guest?: string;
  } = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (guest) {
    headers.guest = guest;
  }

  return useQuery({
    queryKey: boardDataQueryKeys(headers, variables),
    queryFn: async () => {
      const response = await gqlRequestClient(headers).request(
        GetBoardDataDocument,
        variables
      );
      return {
        board: response.getBoard
      } as UseBoardData;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}

export default useBoardData;
