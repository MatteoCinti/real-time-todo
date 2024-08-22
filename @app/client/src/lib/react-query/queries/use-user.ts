import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { AUTH_COOKIE } from '~/lib/constants';

function useUser() {
  const [cookies, _, __] = useCookies([AUTH_COOKIE]);

  return useQuery({
    queryKey: ['user', cookies[AUTH_COOKIE]],
    queryFn: async () =>
      new Promise((resolve) => {
        resolve({ user: cookies[AUTH_COOKIE] });
      })
  });
}

export default useUser;
