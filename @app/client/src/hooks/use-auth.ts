import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';

import { AUTH_COOKIE } from '~/lib/constants';
import { UserLoginQuery } from '~/lib/graphql/__generated__/graphql';
import { userQueryKeys } from '~/lib/react-query/queries/query-keys';

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_COOKIE]);
  const [auth, setAuth] = useState(cookies[AUTH_COOKIE] ?? null);
  const queryClient = useQueryClient();

  async function signIn(user: UserLoginQuery['userLogin']) {
    setCookie(AUTH_COOKIE, user, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    setAuth(user);
    await queryClient.setQueryData(userQueryKeys(user?.token!), {
      user,
      boards: []
    });
  }

  const logout = () => {
    removeCookie(AUTH_COOKIE);
    setAuth(null);
  };

  return { auth, logout, signIn };
};

export type AuthContext = ReturnType<typeof useAuth>;
