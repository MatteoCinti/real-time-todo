import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { AUTH_COOKIE } from '~/lib/constants';
import { gqlRequestClient } from '~/lib/graphql';
import { GetUserDataDocument } from '~/lib/graphql/__generated__/graphql';
import { userQueryKeys } from './query-keys';

function useUser() {
  const [cookies] = useCookies([AUTH_COOKIE]);
  const { token } = cookies[AUTH_COOKIE] ?? '';

  return useQuery({
    queryKey: userQueryKeys(token),
    queryFn: async () => {
      const response = await gqlRequestClient({
        Authorization: `Bearer ${token}`
      }).request(GetUserDataDocument);
      return {
        user: response.getUser,
        boards: response.getUserBoards
      };
    },
    enabled: !!token,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}

export default useUser;
