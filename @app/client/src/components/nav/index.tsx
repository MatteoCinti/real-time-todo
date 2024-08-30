import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useAuth } from '~/hooks';
import { NAV_ID } from '~/lib/constants';

import { Button } from '../ui';

import HamburgerNav from '../hamburger-nav';
import NameTag from '../name-tag';
import ThemeSelector from '../theme-selector';
import TodosFilter from '../todos-filter';

function Nav() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {}, [auth]);

  return (
    <nav
      className="h-nav border-muted mb-[-1px] flex items-center gap-4 rounded-t-lg border pl-2 text-sm"
      data-testid={NAV_ID}
    >
      <NameTag />
      <TodosFilter className="ml-auto" />
      <ThemeSelector />
      <HamburgerNav className="mr-3" logout={logout} />
      <Button
        className="hidden w-min pl-0 lg:inline-block"
        variant="link"
        onClick={() => {
          logout();
          navigate({ to: '/login', replace: true });
        }}
      >
        Logout
      </Button>
    </nav>
  );
}

export default Nav;
