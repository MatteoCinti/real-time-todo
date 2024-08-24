import { useUser } from '~/lib/react-query';
import BoardListItem from '../board-list-item';
import ErrorComponent from '../error';
import { BoardForm } from '../form';
import { Card, CardContent, CardHeader, Skeleton } from '../ui';

function LoadingSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      {[...Array(8)].map((_, i) => (
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
  const { data, isError: userFetchError, isLoading: boardsLoading } = useUser();

  if (userFetchError) {
    return (
      <Card className="border-muted m-4 h-full w-1/3">
        <ErrorComponent />
      </Card>
    );
  }

  return (
    <Card className="border-muted m-4 h-full w-1/3">
      <CardHeader className="border-muted mb-4 border-b py-3 pl-5">
        So many lists todos ...
      </CardHeader>
      <CardContent className="pl-2">
        {boardsLoading ? (
          <LoadingSkeleton />
        ) : (
          <ul>
            {data?.boards?.map((board) => {
              if (!board) return null;
              return <BoardListItem key={board.id} board={board} />;
            })}
            <BoardForm />
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export default BoardList;
