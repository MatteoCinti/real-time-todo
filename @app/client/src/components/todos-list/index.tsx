import { useParams } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

import { Todo } from '~/lib/graphql/__generated__/graphql';
import { reorderTodos } from '~/lib/utils';
import {
  updateGetTodosCache,
  useBoardData,
  useGetTodos,
  useUpdateTodos
} from '~/lib/react-query';

import { CardContent, CardHeader, CardTitle } from '../ui';
import { Drag, DraggedChildrenProps, DropGuide, DropZone } from '../drag';
import TodoItem from '../todo-item';
import { TodoForm } from '../form';

function TodosList() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data: boardData } = useBoardData({ board: Number(boardId) });
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
    updateTodos({ todos: updatedTodos });
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
              <CardTitle>
                Start by completing the{' '}
                <span className="text-accent font-black">
                  {boardData?.board.title}
                </span>{' '}
                you have left!
              </CardTitle>
            </CardHeader>

            <ul>
              {todosData?.todos?.map((todo) => {
                if (!todo) return null;

                return (
                  <TodoItem
                    key={`todo-${todo.id}`}
                    todo={todo}
                    activeItem={activeItem}
                    isDragging={isDragging}
                    activeType={activeType}
                  />
                );
              })}
              <li className="relative m-0 mx-3 mt-[-1px] list-none p-0">
                <DropZone dropId={lastPosition.toString()} remember="true">
                  <DropGuide
                    dropId={lastPosition.toString()}
                    className="h-12"
                  />
                </DropZone>
                <CardContent className="border-muted flex content-center rounded-b-lg border px-4 py-1">
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
