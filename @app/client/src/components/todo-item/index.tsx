import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { GripVertical } from 'lucide-react';

import { Todo } from '~/lib/graphql/__generated__/graphql';
import { deleteTodoFromCache, useDeleteTodo } from '~/lib/react-query';
import { cn } from '~/lib/utils';

import DeleteIcon from '../delete-icon';
import { EditTodo } from '../form';
import { CardContent } from '../ui';
import { DraggedChildrenProps, DragItem, DropGuide, DropZones } from '../drag';

type Props = DraggedChildrenProps & {
  todo: Todo;
};

function TodoItem({ todo, activeItem, isDragging }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  return (
    <DragItem
      dragId={todo.id}
      className={cn(
        'flex-1 cursor-grab',
        // activeItem === todo.id && activeType === 'card' && isDragging
        activeItem === todo.id && isDragging ? 'hidden' : 'translate-x-0'
      )}
      dragType="task"
    >
      <DropZones
        key={todo.id}
        prevId={`${todo.order}`}
        nextId={`${todo.order + 1}`}
        remember="true"
      >
        <DropGuide dropId={`${todo.order}`} />
        <CardContent className="flex content-center py-2 pl-2 pr-4">
          <GripVertical
            size={18}
            className={cn(
              'text-muted my-auto mr-2',
              todo.isDone && 'text-primary'
            )}
          />
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
    </DragItem>
  );
}

export default TodoItem;
