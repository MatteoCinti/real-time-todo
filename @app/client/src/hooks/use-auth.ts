import { useState } from 'react';
import { useCookies } from 'react-cookie';

import { AUTH_COOKIE } from '~/lib/constants';
import { UserLoginQuery } from '~/lib/graphql/__generated__/graphql';

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_COOKIE]);
  const [auth, setAuth] = useState(cookies[AUTH_COOKIE] ?? null);

  const signIn = (user: UserLoginQuery) => {
    setCookie(AUTH_COOKIE, user.userLogin, {
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });
    setAuth(user.userLogin);
  };

  const logout = () => {
    removeCookie(AUTH_COOKIE);
  };

  return { auth, logout, signIn };
};

export type AuthContext = ReturnType<typeof useAuth>;
