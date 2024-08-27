import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { Todo } from '~/lib/graphql/__generated__/graphql';
import { deleteTodoFromCache, useDeleteTodo } from '~/lib/react-query';

import DeleteIcon from '../delete-icon';
import { EditTodo } from '../form';
import { CardContent } from '../ui';
import { DraggedChildrenProps, DragItem, DropGuide, DropZones } from '../drag';

type Props = DraggedChildrenProps & {
  todo: Todo;
};

function TodoItem({ todo, activeItem, isDragging }: Props) {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const queryClient = useQueryClient();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  return (
    <DragItem
      dragId={todo.id}
      className={`cursor-no-drop ${
        // activeItem === todo.id && activeType === 'card' && isDragging
        activeItem === todo.id && isDragging ? 'hidden' : 'translate-x-0'
      }`}
      dragType="task"
    >
      <li className="mx-3 [&>div]:first:rounded-t-lg" key={todo.id}>
        <DropZones
          key={todo.id}
          prevId={`${todo.order - 1}`}
          nextId={`${todo.order}`}
          dropType="card"
          remember="true"
        >
          <DropGuide dropId={`${todo.order}`} />
          <CardContent className="border-muted flex content-center border px-4 py-2">
            <EditTodo todoId={todo.id} />
            <DeleteIcon
              deleteMutation={() => {
                deleteTodoFromCache(
                  queryClient,
                  { id: todo.id, deleted: true },
                  { board: Number(boardId) }
                );
                deleteTodo({ id: todo.id, board: Number(boardId) });
              }}
              isDeleting={isDeleting}
            />
          </CardContent>
        </DropZones>
      </li>
    </DragItem>
  );
}

export default TodoItem;
