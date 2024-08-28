import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Nav } from '~/components';

export const Route = createFileRoute('/_auth')({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  beforeLoad: ({ context, params }) => {
    const typedParams = params as { guest: string };
    const isGuest = typedParams.guest || false;
    const {
      authentication: { auth, signInAsGuest, logoutGuest }
    } = context;

    if (isGuest) {
      signInAsGuest(isGuest);
    }
    if (!isGuest) {
      logoutGuest();
    }

    if (!auth && !isGuest) {
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
