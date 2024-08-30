import { useNavigate, useParams } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import {
  Button,
  Card,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '~/components/ui';
import { cn, isTouchScreenDevice } from '~/lib/utils';
import BoardList from '../board-list';
import NameTag from '../name-tag';

type Props = {
  className?: string;
  logout: () => void;
};

function HamburgerNav({ logout, className }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const [menuOpen, setMenuOpen] = useState(
    (isTouchScreenDevice() && !boardId) ?? false
  );
  const navigate = useNavigate();

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetTrigger className={cn('lg:hidden', className)}>
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex w-4/5 flex-col border-none p-3 lg:hidden"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-xs">
            <NameTag />
          </SheetTitle>
        </SheetHeader>

        <Card className="border-muted relative flex-1 overflow-y-scroll rounded-sm">
          <BoardList onListClick={() => closeMenu()} />
        </Card>

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
