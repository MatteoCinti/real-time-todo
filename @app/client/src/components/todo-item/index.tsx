import { useQueryClient } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { GripVertical, Maximize2 } from 'lucide-react';

import { Todo } from '~/lib/graphql/__generated__/graphql';
import { deleteTodoFromCache, useDeleteTodo } from '~/lib/react-query';
import { cn, isTouchScreenDevice } from '~/lib/utils';

import DeleteIcon from '../delete-icon';
import { EditTodo, EditTodoDescriptionForm } from '../form';
import {
  CardContent,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  TooltipProvider
} from '../ui';
import { DraggedChildrenProps, DragItem, DropGuide, DropZones } from '../drag';

type Props = DraggedChildrenProps & {
  todo: Todo;
};

function TodoItem({ todo, activeItem, isDragging }: Props) {
  const { board: boardId } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const isTouch = isTouchScreenDevice();

  return (
    <TooltipProvider>
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
          <DropGuide
            className={cn(isTouch && 'hidden')}
            dropId={`${todo.order}`}
          />
          <CardContent className="flex content-center py-2 pl-2 pr-4">
            <GripVertical
              size={18}
              className={cn(
                'text-muted-foreground my-auto mr-2',
                todo.isDone && 'text-primary',
                isTouch && 'hidden'
              )}
            />
            <EditTodo todoId={todo.id} />
            <Sheet>
              <SheetTrigger>
                <Maximize2
                  className="text-muted-foreground hover:text-primary"
                  size={14}
                />
              </SheetTrigger>

              <SheetContent className="!min-w-2/4 flex h-full w-4/5 flex-col sm:max-w-full">
                <SheetHeader>
                  <SheetTitle className="whitespace-nowrap">
                    <span className="font-bold">{todo.title} </span>
                    <span>Details</span>
                  </SheetTitle>
                </SheetHeader>
                <SheetDescription>
                  Add more details about your todo
                </SheetDescription>

                <EditTodoDescriptionForm className="h-full" todoId={todo.id} />
              </SheetContent>
            </Sheet>

            <DeleteIcon
              className={cn(
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
      </DragItem>
    </TooltipProvider>
  );
}

export default TodoItem;
