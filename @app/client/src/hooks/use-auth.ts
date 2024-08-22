import { useCookies } from 'react-cookie';
import { AUTH_COOKIE } from '~/lib/constants';

export const useAuth = () => {
  const [cookies, _, removeCookie] = useCookies([AUTH_COOKIE]);
  //   const signIn = () => {
  //     localStorage.setItem('isAuthenticated', 'true');
  //   };

  const logout = () => removeCookie(AUTH_COOKIE);

  const isAuthenticated = cookies[AUTH_COOKIE] ?? null;

  return { isAuthenticated, logout };
};

export type AuthContext = ReturnType<typeof useAuth>;
