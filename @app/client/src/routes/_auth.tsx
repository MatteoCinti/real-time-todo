import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Nav } from '~/components';

export const Route = createFileRoute('/_auth')({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  beforeLoad: ({ context }) => {
    const {
      authentication: { auth }
    } = context;

    if (!auth) {
      return redirect({
        to: '/login'
      });
    }
    return context;
  },
  component: () => (
    <>
      <Nav />
      <Outlet />
    </>
  )
});
