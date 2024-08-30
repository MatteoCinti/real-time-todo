import { Link } from '@tanstack/react-router';

import { Board } from '~/lib/graphql/__generated__/graphql';
import { useDeleteBoard } from '~/lib/react-query';
import { cn } from '~/lib/utils/ui';

import DeleteIcon from '../delete-icon';
import { TaskCounter } from './components';

type Props = {
  board: Omit<Board, 'owner'>;
  className?: string;
  isGuestView?: boolean;
  onListClick?: () => void;
};

function BoardListItem({ board, className, isGuestView, onListClick }: Props) {
  const { mutate, isPending: isDeleting } = useDeleteBoard();

  return (
    <Link
      to="/board/$board"
      params={{ board: board!.id }}
      activeOptions={{ exact: true }}
      disabled={isGuestView}
    >
      {({ isActive }) => (
        <li>
          <button
            className={cn(
              'hover:bg-muted mb-1.5 flex w-full cursor-pointer flex-row items-center rounded-lg px-3 py-2 text-sm',
              className,
              isActive || isGuestView ? 'bg-muted' : 'bg-inherit',
              isGuestView && 'cursor-default'
            )}
            type="button"
            onClick={onListClick}
            onKeyDown={onListClick}
          >
            {board!.title}

            <TaskCounter className="ml-auto" board={board} />
            {!isGuestView && (
              <DeleteIcon
                className={isActive ? 'text-slate-400' : 'text-muted'}
                deleteMutation={() => mutate({ id: board!.id! })}
                isDeleting={isDeleting}
              />
            )}
          </button>
        </li>
      )}
    </Link>
  );
}

export default BoardListItem;
