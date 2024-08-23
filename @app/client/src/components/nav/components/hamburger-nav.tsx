import { useNavigate } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~/components/ui';

function HamburgerNav({ logout }: { logout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navigate = useNavigate();

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger className="ml-auto mr-6 lg:hidden">
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

export default HamburgerNav;
