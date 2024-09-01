import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '~/components/ui';

type Props = {
  submenuOpen: boolean;
  setSubmenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ToggleSubmenu({ submenuOpen, setSubmenuOpen }: Props) {
  return (
    <Button
      className="text-muted-foreground mr-2 w-min p-0 hover:bg-transparent"
      variant="ghost"
      onClick={() => setSubmenuOpen((prev) => !prev)}
    >
      {submenuOpen ? (
        <ChevronUp size={18} className="my-auto" />
      ) : (
        <ChevronDown size={18} className="my-auto" />
      )}
    </Button>
  );
}

export default ToggleSubmenu;
