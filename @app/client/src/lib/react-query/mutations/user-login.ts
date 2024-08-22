import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { gqlRequestClient } from '~/lib/graphql';
import {
  UserLoginDocument,
  UserLoginQueryVariables
} from '~/lib/graphql/__generated__/graphql';
import { AUTH_COOKIE } from '~/lib/constants';

function useLogin() {
  const [_, setCookie, __] = useCookies([AUTH_COOKIE]);

  return useMutation({
    mutationKey: ['user', UserLoginDocument],
    mutationFn: async (variables: UserLoginQueryVariables) =>
      gqlRequestClient.request(UserLoginDocument, variables),
    onSuccess: (data) => {
      if (data.userLogin) {
        setCookie(AUTH_COOKIE, data.userLogin, {
          maxAge: 60 * 60 * 24 * 7
        });
      }
    }
  });
}

export default useLogin;
