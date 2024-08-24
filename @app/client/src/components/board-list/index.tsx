import { useUser } from '~/lib/react-query';
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

function BoardList() {
  const {
    data,
    isError: userFetchError,
    isLoading: boardsLoading,
    isFetching: boardsFetching
  } = useUser();

  if (userFetchError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <CardHeader className="border-muted mb-4 border-b py-3 pl-5">
        <CardTitle> Yet more things to do?</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {boardsLoading || boardsFetching ? (
          <LoadingSkeleton />
        ) : (
          <ul>
            {data?.boards?.map((board) => {
              if (!board) return null;
              return <BoardListItem key={board.id!} board={board} />;
            })}
            <BoardForm />
          </ul>
        )}
      </CardContent>
    </>
  );
}

export default BoardList;
