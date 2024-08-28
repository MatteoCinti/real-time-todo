import { Link } from '@tanstack/react-router';

import { Board } from '~/lib/graphql/__generated__/graphql';
import { useDeleteBoard } from '~/lib/react-query';
import { cn } from '~/lib/utils/ui';

import DeleteIcon from '../delete-icon';

type Props = {
  board: Omit<Board, 'owner'>;
  className?: string;
  isGuestView?: boolean;
};

function BoardListItem({ board, className, isGuestView }: Props) {
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
            isActive || isGuestView ? 'bg-muted' : 'bg-inherit'
          )}
        >
          {board!.title}
          <DeleteIcon
            className={isActive ? 'text-slate-400' : 'text-muted'}
            deleteMutation={() => mutate({ id: board!.id! })}
            isDeleting={isDeleting}
          />
        </li>
      )}
    </Link>
  );
}

export default BoardListItem;
