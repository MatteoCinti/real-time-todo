import { useParams } from '@tanstack/react-router';
import { useBoardData, useGetTodos } from '~/lib/react-query';
import { CardContent, CardHeader, CardTitle } from '../ui';
import { TodoForm } from '../form';

function TodosList() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data: boardData } = useBoardData({ board: Number(boardId) });
  const { data: todosData } = useGetTodos({ board: Number(boardId) });

  return (
    <>
      <CardHeader className="border-muted mb-4 w-full whitespace-nowrap border-b py-3 pl-5">
        <CardTitle>
          Start by completing the{' '}
          <span className="text-accent font-black">
            {boardData?.board.title}
          </span>{' '}
          you have left!
        </CardTitle>
      </CardHeader>

      <ul>
        {todosData?.todos?.map((todo) => {
          if (!todo) return null;
          return (
            <li className="mx-3 [&>div]:first:rounded-t-lg" key={todo.id}>
              <CardContent className="border-muted flex content-center border px-4 py-2">
                {todo.title}
              </CardContent>
            </li>
          );
        })}
        <li className="relative m-0 mx-3 mt-[-1px] list-none p-0">
          <CardContent className="border-muted flex content-center rounded-b-lg border px-4 py-1">
            <TodoForm />
          </CardContent>
        </li>
      </ul>
    </>
  );
}

export default TodosList;
