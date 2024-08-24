import { useCookies } from 'react-cookie';
import { AUTH_COOKIE } from '~/lib/constants';

function useGetUserToken() {
  const [cookies] = useCookies([AUTH_COOKIE]);
  const { token } = cookies[AUTH_COOKIE] ?? '';
  return token;
}
export default useGetUserToken;
