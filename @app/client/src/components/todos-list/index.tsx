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

import {
  Drag,
  DraggedChildrenProps,
  DragItem,
  DropGuide,
  DropZone
} from '../drag';
import { CardContent, CardHeader, CardTitle, Skeleton } from '../ui';
import { TodoForm } from '../form';
import TodosFilter from '../todos-filter';
import ShareBoardLink from '../share-board-link';
import TopLevelTodo from '../top-level-todo-item.tsx';

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

  function handleDrop({ dragItem, drop }: { dragItem: number; drop: string }) {
    const [parentId, newCardPosition] = drop
      .split('-')
      .map((string) => Number(string));

    const droppedAsSubtask = parentId !== 0;

    if (!droppedAsSubtask) {
      const todosClone = [...todosData!.todos!] as Todo[];
      const updatedTodos = reorderTodos(
        todosClone,
        dragItem,
        newCardPosition,
        0
      );
      updateTodos({ board: Number(boardId), todos: updatedTodos });
      updateGetTodosCache(queryClient, updatedTodos, {
        board: Number(boardId)
      });
    }

    if (droppedAsSubtask) {
      const todosClone = [...todosData!.todos!] as Todo[];
      const updatedTodos = reorderTodos(
        todosClone,
        dragItem,
        newCardPosition,
        parentId
      );
      updateTodos({ board: Number(boardId), todos: updatedTodos });
      updateGetTodosCache(queryClient, updatedTodos, {
        board: Number(boardId)
      });
    }
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

                <ShareBoardLink className="ml-auto mr-2" />
                <TodosFilter />
              </CardTitle>
            </CardHeader>

            <ul className="flex h-full w-full flex-col overflow-y-auto overscroll-contain pb-1">
              {filterTodos(todosData?.todos, filters).map((todo) => {
                if (!todo) return null;

                return (
                  <li
                    className={cn(
                      'border-muted mx-3 mt-[-1px] flex flex-col flex-wrap first-of-type:mt-0',
                      todo.isDone && 'bg-muted border-primary-foreground'
                    )}
                    key={todo.id}
                  >
                    <DragItem
                      dragId={todo.id}
                      className={cn(
                        'group flex-1 cursor-grab',
                        activeItem === todo.id && isDragging
                          ? 'hidden'
                          : 'translate-x-0'
                      )}
                      dragType="task"
                    >
                      <TopLevelTodo
                        key={`todo-${todo.id}`}
                        todo={todo}
                        activeItem={activeItem}
                        isDragging={isDragging}
                        activeType={activeType}
                        // eslint-disable-next-line react/jsx-boolean-value
                        hasSubMenu={true}
                      />
                    </DragItem>
                  </li>
                );
              })}
              <li className="border-muted relative mx-3 flex h-12 list-none flex-row rounded-b-lg border p-0">
                <DropZone
                  dropId={`0-${lastPosition.toString()}`}
                  remember="true"
                >
                  <DropGuide
                    dropId={`0-${lastPosition.toString()}`}
                    className="h-12"
                  />
                  <CardContent className="flex h-full w-full content-center px-4 py-1">
                    <TodoForm />
                  </CardContent>
                </DropZone>
              </li>
            </ul>
          </>
        );
      }}
    </Drag>
  );
}

export default TodosList;
