import { useParams } from '@tanstack/react-router';
import { TodosList } from '~/components';
import { useSubscribeToDos } from '~/lib/react-query';

function TodosPage() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  useSubscribeToDos({ board: Number(boardId) });

  return <TodosList />;
}

export default TodosPage;
