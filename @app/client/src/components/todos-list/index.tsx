/* eslint-disable */

import { useParams } from '@tanstack/react-router';
import { useBoardData, useGetTodos, useUpdateTodos } from '~/lib/react-query';

import { CardContent, CardHeader, CardTitle } from '../ui';
import { Drag, DraggedChildrenProps, DropGuide, DropZone } from '../drag';
import TodoItem from '../todo-item';
import { TodoForm } from '../form';
import { Todo } from '~/lib/graphql/__generated__/graphql';
import { indexToPosition } from '~/lib/utils';

function TodosList() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data: boardData } = useBoardData({ board: Number(boardId) });
  const { data: todosData } = useGetTodos({ board: Number(boardId) });
  const { mutate: updateTodos } = useUpdateTodos();
  function reorderTodos(
    todos: Todo[],
    draggedTodoId: number,
    newCardPosition: number
  ): Todo[] {
    const oldIndex = todos.findIndex((todo) => todo.id === draggedTodoId);
    // index is -1 than position
    const newIndex = newCardPosition - 1;
    if (oldIndex === -1) {
      throw new Error('Todo not found');
    }

    const [draggedTodo] = todos.splice(oldIndex, 1);
    todos.splice(newIndex, 0, draggedTodo);
    const updatedTodos = todos.map((todo, index) => ({
      ...todo,
      order: indexToPosition(index) // Adjusting order to be 1-based instead of 0-based
    }));

    return updatedTodos;
  }

  function handleDrop({
    dragItem,
    dragType,
    drop
  }: {
    dragItem: number;
    dragType: string;
    drop: string;
  }) {
    // let [dropParentArea, newCardIndex] = drop
    //   .split('-')
    //   .map((string) => parseInt(string));
    let newCardPosition = Number(drop) - 1;
    const todosClone = [...todosData!.todos!] as Todo[];
    const updatedTodos = reorderTodos(todosClone, dragItem, newCardPosition);
    updateTodos({ todos: updatedTodos });
    // eslint-disable-next-line no-console
    console.log('🚀 ~ TodosList ~ updatedTodos:', updatedTodos);
  }

  return (
    <Drag handleDrop={handleDrop}>
      {({ activeItem, activeType, isDragging }: DraggedChildrenProps) => {
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
                <CardContent className="border-muted flex content-center rounded-b-lg border px-4 py-1">
                  <TodoForm />
                </CardContent>
                <DropZone
                  dropId={`${todosData?.todos?.length}`}
                  remember="true"
                >
                  <DropGuide
                    dropId={`${todosData?.todos?.length! + 1}`}
                    className="h-24"
                  />
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
