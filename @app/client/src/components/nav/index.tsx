import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useAuth, useTheme } from '~/hooks';
import { NAV_ID } from '~/lib/constants';

import { Button, Switch } from '../ui';

import HamburgerNav from '../hamburger-nav';
import NameTag from '../name-tag';

function Nav() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {}, [auth]);

  return (
    <nav
      className="h-nav border-muted mb-[-1px] rounded-t-lg border pl-2 text-sm"
      data-testid={NAV_ID}
    >
      <div className="flex h-full items-center justify-between">
        <NameTag />
        <HamburgerNav logout={logout} />
        <Switch
          value={theme}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <Button
          className="ml-auto mr-0 hidden w-min lg:inline-block"
          variant="link"
          onClick={() => {
            logout();
            navigate({ to: '/login', replace: true });
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Nav;
