import { useBoardData, useUser } from '~/lib/react-query';
import { useParams } from '@tanstack/react-router';
import { useAuth } from '~/hooks';

import BoardListItem from '../board-list-item';
import ErrorComponent from '../error';
import { BoardForm } from '../form';
import { CardContent, CardHeader, CardTitle, Skeleton } from '../ui';

function LoadingSkeleton() {
  return (
    <div className="mt-12 flex flex-col space-y-3 lg:mt-0">
      {[...Array(14)].map((_, i) => (
        <Skeleton
          // eslint-disable-next-line react/no-array-index-key
          key={`skel-${i}`}
          className="mb-1 ml-3 mr-5 h-4 w-[calc(100%-15px)] rounded-lg"
        />
      ))}
      <Skeleton className="ml-3 mr-5 h-4 w-[calc(100%-90px)] rounded-lg" />
    </div>
  );
}

export const componentTitle = 'Yet more things to do?';

type Props = {
  onListClick?: () => void;
};

function BoardList({ onListClick }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const { guest, auth } = useAuth();
  const {
    data,
    isError: userFetchError,
    isLoading: boardsLoading,
    isFetching: boardsFetching
  } = useUser();
  const { data: guestBoardView, isError: guestFetchError } = useBoardData(
    {
      board: Number(boardId)
    },
    !!guest
  );

  if (userFetchError && guestFetchError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <CardHeader className="border-muted text-primary absolute left-0 right-0 border-b py-3 pl-5 lg:relative lg:mb-4">
        <CardTitle className="text-xs lg:text-base">{componentTitle}</CardTitle>
      </CardHeader>
      <CardContent className="text-primary px-2">
        {boardsLoading || boardsFetching ? (
          <LoadingSkeleton />
        ) : (
          <ul className="mt-12 lg:mt-0">
            {data?.boards?.map((board) => {
              if (!board) return null;
              return (
                <BoardListItem
                  onListClick={onListClick}
                  key={board.id!}
                  board={board}
                />
              );
            })}

            {guest && guestBoardView?.board && (
              <BoardListItem
                onListClick={onListClick}
                isGuestView={!!guest}
                board={guestBoardView.board}
              />
            )}

            {auth && !guest && (
              <li className="border-muted hover:border-primary focus-within:border-primary relative m-0 mx-2 border-b p-0">
                <BoardForm />
              </li>
            )}
          </ul>
        )}
      </CardContent>
    </>
  );
}

export default BoardList;
