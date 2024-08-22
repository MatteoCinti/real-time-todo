/* eslint-disable */
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Nav } from '~/components';

export const Route = createFileRoute('/_auth')({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  beforeLoad: ({ context, location }) => {
    const {
      authentication: { isAuthenticated }
    } = context;

    if (!isAuthenticated) {
      return redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  },
  component: () => (
    <>
      <Nav />
      <Outlet />
    </>
  )
});
