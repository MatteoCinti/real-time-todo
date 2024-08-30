import { useCallback, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQueryClient } from '@tanstack/react-query';

import { AUTH_COOKIE } from '~/lib/constants';
import { userQueryKeys } from '~/lib/react-query';
import { UserLoginQuery } from '~/lib/graphql/__generated__/graphql';

import { AuthProviderContext } from './context';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_COOKIE]);
  const [auth, setAuth] = useState<UserLoginQuery['userLogin']>(
    cookies[AUTH_COOKIE] ?? null
  );
  const [guest, setGuest] = useState(sessionStorage.getItem('guest') ?? null);
  const queryClient = useQueryClient();

  const signIn = useCallback(
    async (user: UserLoginQuery['userLogin']) => {
      setCookie(AUTH_COOKIE, user, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      });
      setAuth(user);

      sessionStorage.removeItem('guest');
      await queryClient.invalidateQueries({
        queryKey: userQueryKeys(user!.token!)
      });
    },
    [setCookie, setAuth, queryClient]
  );

  const signInAsGuest = useCallback(
    async (guestUser: string) => {
      setGuest(guestUser);
      sessionStorage.setItem('guest', guestUser);
    },
    [setGuest]
  );

  const logoutGuest = useCallback(() => {
    sessionStorage.removeItem('guest');
    setGuest(null);
  }, [setGuest]);

  const logout = useCallback(() => {
    removeCookie(AUTH_COOKIE);
    sessionStorage.removeItem('guest');
    setAuth(null);
  }, [removeCookie, setAuth]);

  const values = useMemo(
    () => ({
      auth,
      guest,
      logoutGuest,
      logout,
      signIn,
      signInAsGuest,
      setAuth,
      setGuest
    }),
    [auth, guest, logoutGuest, logout, signIn, signInAsGuest, setAuth, setGuest]
  );

  return (
    <AuthProviderContext.Provider value={values}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export default AuthProvider;
