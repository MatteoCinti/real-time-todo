import { useParams } from '@tanstack/react-router';
import { useBoardData } from '~/lib/react-query';
import { useSubscribeToDos } from '~/lib/react-query/subscriptions';
import { CardContent, CardHeader, CardTitle } from '../ui';
import { TodoForm } from '../form';

function TodosList() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data } = useBoardData({ board: Number(boardId) });
  useSubscribeToDos({ board: Number(boardId) });

  return (
    <>
      <CardHeader className="border-muted mb-4 w-full whitespace-nowrap border-b py-3 pl-5">
        <CardTitle>
          Start by completing the{' '}
          <span className="text-accent font-black">{data?.board.title}</span>{' '}
          you have left!
        </CardTitle>
      </CardHeader>

      <ul>
        {data?.todos?.map((todo) => {
          if (!todo) return null;
          return (
            <li key={todo.id}>
              <CardContent>
                <div>{todo.title}</div>
              </CardContent>
            </li>
          );
        })}
        <li className="relative m-0 mx-3 list-none p-0">
          <CardContent>
            <TodoForm />
          </CardContent>
        </li>
      </ul>
    </>
  );
}

export default TodosList;
