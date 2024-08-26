import { useParams } from '@tanstack/react-router';
import { TodosList } from '~/components';
import {
  useSubscribeToTodoUpdates,
  useSuscribeTodoCreate,
  useSubscribeTodoDelete
} from '~/lib/react-query';

function TodosPage() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  useSuscribeTodoCreate({ board: Number(boardId) });
  useSubscribeToTodoUpdates({ board: Number(boardId) });
  useSubscribeTodoDelete({ board: Number(boardId) });

  return <TodosList />;
}

export default TodosPage;
