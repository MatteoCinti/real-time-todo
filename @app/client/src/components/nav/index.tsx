import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '~/hooks';
import { NAV_ID } from '~/lib/constants';

import { Button } from '../ui';
import { HamburgerNav, NameTag } from './components';

function Nav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className="h-nav border-muted mb-[-1px] rounded-t-lg border pl-2 text-sm"
      data-testid={NAV_ID}
    >
      <div className="flex h-full items-center justify-between">
        <NameTag />
        <HamburgerNav logout={logout} />
        <Button
          className="ml-auto mr-0 hidden w-min lg:inline-block"
          variant="link"
          onClick={() => {
            logout();
            navigate({ to: '/login' });
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Nav;
