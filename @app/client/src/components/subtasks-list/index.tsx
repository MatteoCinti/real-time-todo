import { useParams } from '@tanstack/react-router';
import { Todo } from '~/lib/graphql/__generated__/graphql';
import { useGetTodos } from '~/lib/react-query';
import { cn } from '~/lib/utils';

import { DraggedChildrenProps, DragItem, DropGuide, DropZone } from '../drag';
import TodoItem from '../todo-item';
import { CardContent } from '../ui';
import { TodoForm } from '../form';

type Props = DraggedChildrenProps & {
  parentTodo: Todo;
  className?: string;
};

function SubtaskList({
  parentTodo,
  activeItem,
  activeType,
  isDragging,
  className
}: Props) {
  const { board: boardId } = useParams({ strict: false });
  const { data: todosData } = useGetTodos({ board: Number(boardId) });

  const subTasks = todosData!.todos!.filter(
    (t) => t!.parentId === parentTodo.id
  );
  const lastPosition = subTasks ? subTasks.length + 1 : 1;

  return (
    <div className={cn(className)}>
      <ul className="flex h-full w-full flex-col overscroll-contain">
        {!subTasks && (
          <DropZone dropId={`${parentTodo.id}-1`}>
            <DropGuide as="li" dropId={`${parentTodo.id}-1`} className="h-12" />
          </DropZone>
        )}
        {subTasks?.map((subTask) => {
          if (!subTask) return null;
          return (
            <li
              key={subTask.id}
              className={cn(
                'border-muted mt-[-1px] flex flex-col flex-wrap border first-of-type:mt-0',
                subTask.isDone && 'bg-muted border-primary-foreground'
              )}
            >
              <DragItem
                dragId={subTask.id}
                className={cn(
                  'group flex-1 cursor-grab',
                  activeItem === subTask.id && isDragging
                    ? 'hidden'
                    : 'translate-x-0'
                )}
                dragType="task"
              >
                <TodoItem
                  key={`todo-${subTask.id}`}
                  todo={subTask}
                  activeItem={activeItem}
                  isDragging={isDragging}
                  activeType={activeType}
                />
              </DragItem>
            </li>
          );
        })}

        <li className="border-muted relative z-20 my-[-1px] mb-2 flex h-12 w-full list-none flex-row rounded-b-lg border p-0">
          <DropZone
            dropId={`${parentTodo.id}-${lastPosition.toString()}`}
            remember="true"
          >
            <DropGuide
              dropId={`${parentTodo.id}-${lastPosition.toString()}`}
              className="h-12"
            />
            <CardContent className="flex h-full w-full flex-1 content-center px-4 py-1">
              <TodoForm parentId={parentTodo.id} position={lastPosition} />
            </CardContent>
          </DropZone>
        </li>
      </ul>
    </div>
  );
}

export default SubtaskList;
