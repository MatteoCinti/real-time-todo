import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';

import { AUTH_COOKIE } from '~/lib/constants';
import { UserLoginQuery } from '~/lib/graphql/__generated__/graphql';
import { userQueryKeys } from '~/lib/react-query/queries/query-keys';

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_COOKIE]);
  const [auth, setAuth] = useState(cookies[AUTH_COOKIE] ?? null);
  const [guest, setGuest] = useState(sessionStorage.getItem('guest') ?? null);
  const queryClient = useQueryClient();

  useEffect(() => {}, [cookies, auth]);

  async function signIn(user: UserLoginQuery['userLogin']) {
    setCookie(AUTH_COOKIE, user, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    setAuth(user);
    sessionStorage.removeItem('guest');
    await queryClient.invalidateQueries({
      queryKey: userQueryKeys(user!.token!)
    });
  }

  async function signInAsGuest(guestUser: string) {
    setGuest(guestUser);
    sessionStorage.setItem('guest', guestUser);
  }

  function logoutGuest() {
    sessionStorage.removeItem('guest');
    setGuest(null);
  }

  const logout = () => {
    removeCookie(AUTH_COOKIE);
    sessionStorage.removeItem('guest');
    setAuth(null);
  };

  return { auth, guest, logoutGuest, logout, signIn, signInAsGuest };
};

export type AuthContext = ReturnType<typeof useAuth>;
