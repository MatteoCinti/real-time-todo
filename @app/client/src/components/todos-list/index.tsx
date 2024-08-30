import { useParams } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

import { Todo } from '~/lib/graphql/__generated__/graphql';

import { cn, filterTodos, reorderTodos } from '~/lib/utils';
import { useActiveFilters } from '~/hooks';
import {
  updateGetTodosCache,
  useBoardData,
  useGetTodos,
  useUpdateTodos
} from '~/lib/react-query';

import { Drag, DraggedChildrenProps, DropGuide, DropZone } from '../drag';
import { CardContent, CardHeader, CardTitle, Skeleton } from '../ui';
import TodoItem from '../todo-item';
import { TodoForm } from '../form';
import TodosFilter from '../todos-filter';

function SectionTitleSkeleton() {
  return <Skeleton className="h-4 w-16 rounded-sm p-1" />;
}

function TodosList() {
  const { board: boardId } = useParams({ strict: false });
  const filters = useActiveFilters();

  const { data: boardData, isLoading: boardLoading } = useBoardData({
    board: Number(boardId)
  });
  const { data: todosData } = useGetTodos({ board: Number(boardId) });
  const { mutate: updateTodos } = useUpdateTodos();
  const queryClient = useQueryClient();

  function handleDrop({
    dragItem,
    // dragType,
    drop
  }: {
    dragItem: number;
    dragType: string;
    drop: string;
  }) {
    // let [dropParentArea, newCardIndex] = drop
    //   .split('-')
    //   .map((string) => parseInt(string));
    const newCardPosition = Number(drop);
    const todosClone = [...todosData!.todos!] as Todo[];
    const updatedTodos = reorderTodos(todosClone, dragItem, newCardPosition);
    updateTodos({ board: Number(boardId), todos: updatedTodos });
    updateGetTodosCache(queryClient, updatedTodos, {
      board: Number(boardId)
    });
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Drag handleDrop={handleDrop}>
      {({ activeItem, activeType, isDragging }: DraggedChildrenProps) => {
        let lastPosition = 1;

        if (todosData?.todos) {
          lastPosition = todosData.todos.length + 1;
        }

        return (
          <>
            <CardHeader className="border-muted mb-4 w-full whitespace-nowrap border-b py-3 pl-5">
              <CardTitle className="flex flex-row whitespace-pre-wrap">
                <span className="hidden lg:inline-flex">{`Start by completing the `}</span>
                <span className="text-accent font-bold lg:font-black">
                  {boardLoading && <SectionTitleSkeleton />}
                  {boardData?.board.title}
                </span>
                <span className="hidden lg:inline-flex">{` you have left!`}</span>

                <TodosFilter className="ml-auto" />
              </CardTitle>
            </CardHeader>

            <ul className="flex h-full w-full flex-col overflow-y-auto overscroll-contain pb-1">
              {filterTodos(todosData?.todos, filters).map((todo) => {
                if (!todo) return null;

                return (
                  <li
                    className={cn(
                      'border-muted mx-3 mt-[-1px] flex flex-row border first-of-type:mt-0',
                      todo.isDone && 'bg-muted border-primary-foreground'
                    )}
                    key={todo.id}
                  >
                    <TodoItem
                      key={`todo-${todo.id}`}
                      todo={todo}
                      activeItem={activeItem}
                      isDragging={isDragging}
                      activeType={activeType}
                    />
                  </li>
                );
              })}
              <li className="border-muted relative mx-3 h-12 list-none rounded-b-lg border p-0">
                <DropZone dropId={lastPosition.toString()} remember="true">
                  <DropGuide
                    dropId={lastPosition.toString()}
                    className="h-12"
                  />
                </DropZone>
                <CardContent className="flex h-full content-center px-4 py-1">
                  <TodoForm />
                </CardContent>
              </li>
            </ul>
          </>
        );
      }}
    </Drag>
  );
}

export default TodosList;
