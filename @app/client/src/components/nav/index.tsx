import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Menu } from 'lucide-react';

import { useAuth } from '~/hooks';
import { NAV_ID } from '~/lib/constants';

import {
  Sheet,
  Button,
  Separator,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription
} from '../ui';

import NameTag from './components/name-tag';

function HamburgerNav({ logout }: { logout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navigate = useNavigate();

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger className="ml-auto mr-0 lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-4/5 flex-col border-none lg:hidden"
      >
        <Separator
          orientation="vertical"
          className="bg-primary-foreground absolute bottom-0 right-0 top-0"
        />
        <SheetHeader>
          <SheetTitle className="pl-2">
            Hello <span className="italic"> Matteo</span>
          </SheetTitle>
        </SheetHeader>
        <Separator className="bg-muted" />
        <SheetDescription className="bottom-0 mt-auto flex flex-col">
          <Button
            variant="secondary"
            onClick={() => {
              logout();
              closeMenu();
              navigate({ to: '/login' });
            }}
          >
            Logout
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

function Nav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav
      className="h-nav lg:border-muted mb-[-1px] rounded-t-lg pl-2 text-sm lg:border"
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
