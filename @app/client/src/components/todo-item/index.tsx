import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { Todo } from '~/lib/graphql/__generated__/graphql';
import { updateTodoDeletedCache, useDeleteTodo } from '~/lib/react-query';

import DeleteIcon from '../delete-icon';
import { EditTodo } from '../form';
import { CardContent } from '../ui';

type Props = {
  todo: Todo;
};

function TodoItem({ todo }: Props) {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const queryClient = useQueryClient();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  return (
    <li className="mx-3 [&>div]:first:rounded-t-lg" key={todo.id}>
      <CardContent className="border-muted flex content-center border px-4 py-2">
        <EditTodo todoId={todo.id} />
        <DeleteIcon
          deleteMutation={() => {
            updateTodoDeletedCache(
              queryClient,
              { id: todo.id, deleted: true },
              { board: Number(boardId) }
            );
            deleteTodo({ id: todo.id, board: Number(boardId) });
          }}
          isDeleting={isDeleting}
        />
      </CardContent>
    </li>
  );
}

export default TodoItem;
