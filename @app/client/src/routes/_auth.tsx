/* eslint-disable */
import {
  Outlet,
  ParsedLocation,
  createFileRoute,
  redirect
} from '@tanstack/react-router';
import { Nav } from '~/components';

function isPotentialGuestRoute(location: ParsedLocation<{}>) {
  const locationParts = location.pathname.split('/');

  return locationParts[1] === 'board' && Number(locationParts[2]);
}

function getGuestFromLocation(location: ParsedLocation<{}>) {
  const locationParts = location.pathname.split('/');

  return locationParts[3];
}

export const Route = createFileRoute('/_auth')({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  beforeLoad: ({ context, location }) => {
    const isGuest =
      isPotentialGuestRoute(location) && getGuestFromLocation(location);

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
