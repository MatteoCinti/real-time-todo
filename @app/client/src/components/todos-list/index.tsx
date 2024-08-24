import { useParams } from '@tanstack/react-router';
import { useBoardData } from '~/lib/react-query';
import { useSubscribeToDos } from '~/lib/react-query/subscriptions';
import { CardHeader, CardTitle } from '../ui';

function TodosList() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const {
    data: { board, todos }
  } = useBoardData({ board: Number(boardId) });
  useSubscribeToDos({ board: Number(boardId) });

  return (
    <>
      <CardHeader className="border-muted mb-4 w-full whitespace-nowrap border-b py-3 pl-5">
        <CardTitle>
          Start by completing the{' '}
          <span className="text-accent font-black">{board.title}</span> you have
          left!
        </CardTitle>
      </CardHeader>

      {todos?.map((todo) => {
        if (!todo) return null;
        return <div key={todo.id}>{todo.title}</div>;
      })}
    </>
  );
}

export default TodosList;
