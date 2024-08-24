import { useQuery } from '@tanstack/react-query';

import { useGetUserToken } from '~/hooks';
import { gqlRequestClient } from '~/lib/graphql';
import { GetUserDataDocument } from '~/lib/graphql/__generated__/graphql';

import { userQueryKeys } from './query-keys';
import { UseUserData } from '../types';

function useUser() {
  const token = useGetUserToken();

  return useQuery({
    queryKey: userQueryKeys(token),
    queryFn: async () => {
      const response = await gqlRequestClient({
        Authorization: `Bearer ${token}`
      }).request(GetUserDataDocument);
      return {
        user: response.getUser,
        boards: response.getUserBoards
      } as UseUserData;
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}

export default useUser;
