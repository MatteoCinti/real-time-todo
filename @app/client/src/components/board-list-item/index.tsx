import { Link } from '@tanstack/react-router';
import { X } from 'lucide-react';

import { Board } from '~/lib/graphql/__generated__/graphql';
import { useDeleteBoard } from '~/lib/react-query';
import { cn } from '~/lib/utils/ui';

import { LoadingSpinner } from '../ui';

type Props = {
  board: Omit<Board, 'owner'>;
  className?: string;
};

function BoardListItem({ board, className }: Props) {
  const { mutate, isPending: isDeleting } = useDeleteBoard();

  return (
    <Link
      to="/board/$board"
      params={{ board: board!.id }}
      activeOptions={{ exact: true }}
    >
      {({ isActive }) => (
        <li
          className={cn(
            'hover:bg-muted mb-1.5 flex cursor-pointer flex-row items-center justify-between rounded-lg px-3 py-2 text-sm',
            className,
            isActive ? 'bg-muted' : 'bg-inherit'
          )}
        >
          {board!.title}
          {isDeleting ? (
            <LoadingSpinner className="h-4 w-4" />
          ) : (
            <X
              className={cn(
                'hover:text-primary h-full cursor-pointer',
                isActive ? 'text-slate-400' : 'text-muted'
              )}
              size={14}
              onClick={async () => {
                mutate({ id: board!.id });
              }}
            />
          )}
        </li>
      )}
    </Link>
  );
}

export default BoardListItem;
