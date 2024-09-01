import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { GripVertical } from 'lucide-react';

import { Todo } from '~/lib/graphql/__generated__/graphql';
import {
  deleteTodoFromCache,
  useDeleteTodo,
  useGetTodos
} from '~/lib/react-query';
import { cn, isTouchScreenDevice } from '~/lib/utils';

import DeleteIcon from '../delete-icon';
import { EditTodo } from '../form';
import { Badge, CardContent, TooltipProvider } from '../ui';
import { DraggedChildrenProps, DropGuide, DropZones } from '../drag';
import { TodoDetailSheet, ToggleSubmenu } from './components';

type Props = DraggedChildrenProps & {
  todo: Todo;
  hasSubMenu?: boolean;
  submenuOpen?: boolean;
  setSubmenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function TodoItem({
  todo,
  hasSubMenu = false,
  submenuOpen,
  setSubmenuOpen
}: Props) {
  const isTouch = isTouchScreenDevice();
  const { board: boardId } = useParams({ strict: false });
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { data: todosData } = useGetTodos({ board: Number(boardId) });
  const subtasks = todosData!.todos!.filter((t) => t!.parentId === todo.id);

  const queryClient = useQueryClient();

  const parentId = todo.parentId ?? 0;

  return (
    <TooltipProvider>
      <DropZones
        key={todo.id}
        prevId={`${parentId}-${todo.order}`}
        nextId={`${parentId}-${todo.order + 1}`}
        remember="true"
      >
        <DropGuide
          className={cn(isTouch && 'hidden')}
          dropId={`${parentId}-${todo.order}`}
        />
        <CardContent className="border-muted flex flex-1 flex-row content-center border py-2 pl-2 pr-4">
          <GripVertical
            size={18}
            className={cn(
              'text-muted-foreground my-auto mr-2',
              todo.isDone && 'text-primary',
              isTouch && 'hidden'
            )}
          />

          <EditTodo todoId={todo.id} />
          {subtasks.length > 0 && (
            <Badge
              className="my-auto mr-2 h-min py-0 text-xs"
              variant="secondary"
            >
              {subtasks.length}
            </Badge>
          )}
          {hasSubMenu && (
            <ToggleSubmenu
              submenuOpen={submenuOpen!}
              setSubmenuOpen={setSubmenuOpen!}
            />
          )}
          <TodoDetailSheet todo={todo} />

          <DeleteIcon
            className={cn(
              'ml-2',
              todo.isDone && 'text-muted-foreground hover:text-primary'
            )}
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
    </TooltipProvider>
  );
}

export default TodoItem;
