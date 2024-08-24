import { X } from 'lucide-react';
import { ErrorComponent } from '~/components';
import { BoardForm } from '~/components/form';
import { Card, CardContent, CardHeader } from '~/components/ui';
import { useUser, useDeleteBoard } from '~/lib/react-query';

function Home() {
  const { data, isError: userFetchError } = useUser();
  const { mutate } = useDeleteBoard();
  if (userFetchError) {
    return <ErrorComponent />;
  }

  return (
    <Card className="border-muted flex h-full w-full flex-col rounded-t-none p-0">
      <CardHeader>Home</CardHeader>

      <Card className="border-muted m-4 h-full w-1/3">
        <CardHeader>Lists</CardHeader>
        <CardContent>
          <ul>
            {data?.boards?.map((list) => {
              return (
                <li key={list!.id}>
                  {list!.title}{' '}
                  <X
                    onClick={async () => {
                      mutate({ id: list!.id });
                    }}
                  />
                </li>
              );
            })}
            <BoardForm />
          </ul>
        </CardContent>
      </Card>
    </Card>
  );
}

export default Home;
