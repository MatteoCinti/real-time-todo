import { X } from 'lucide-react';

import { cn } from '~/lib/utils/ui';
import { useDeleteBoard } from '~/lib/react-query';
import { Board } from '~/lib/graphql/__generated__/graphql';
import { LoadingSpinner } from '../ui';

type Props = {
  board: Omit<Board, 'owner'>;
  className?: string;
};

function BoardListItem({ board, className }: Props) {
  const { mutateAsync, isPending: isDeleting } = useDeleteBoard();

  return (
    <li
      className={cn(
        'hover:bg-muted flex cursor-pointer flex-row items-center justify-between rounded-lg px-3 py-1.5 text-sm hover:font-medium',
        className
      )}
    >
      {board!.title}
      {isDeleting ? (
        <LoadingSpinner className="h-4 w-4" />
      ) : (
        <X
          className="text-muted hover:text-primary h-full cursor-pointer"
          size={14}
          onClick={async () => {
            mutateAsync({ id: board!.id });
          }}
        />
      )}
    </li>
  );
}

export default BoardListItem;
