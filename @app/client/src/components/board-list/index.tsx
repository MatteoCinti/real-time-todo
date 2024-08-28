import { useBoardData, useUser } from '~/lib/react-query';
import { useParams } from '@tanstack/react-router';
import { useAuth } from '~/hooks';

import BoardListItem from '../board-list-item';
import ErrorComponent from '../error';
import { BoardForm } from '../form';
import { CardContent, CardHeader, CardTitle, Skeleton } from '../ui';

function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {[...Array(16)].map((_, i) => (
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

function BoardList() {
  const { board: boardId } = useParams({ strict: false });
  const {
    data,
    isError: userFetchError,
    isLoading: boardsLoading,
    isFetching: boardsFetching
  } = useUser();
  const {
    data: guestBoardView,
    isLoading: guestBoardLoading,
    isError: guestFetchError
  } = useBoardData({
    board: Number(boardId)
  });
  const { guest, auth } = useAuth();

  if (userFetchError && guestFetchError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <CardHeader className="border-muted mb-4 border-b py-3 pl-5">
        <CardTitle>{componentTitle}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {boardsLoading || boardsFetching || guestBoardLoading ? (
          <LoadingSkeleton />
        ) : (
          <ul>
            {data?.boards?.map((board) => {
              if (!board) return null;
              return <BoardListItem key={board.id!} board={board} />;
            })}

            {guestBoardView?.board && (
              <BoardListItem
                isGuestView={!!guest}
                board={guestBoardView.board}
              />
            )}

            {auth && (
              <li className="border-muted hover:border-primary focus-within:border-primary relative m-0 ml-3 border-b p-0">
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
