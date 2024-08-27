/* eslint-disable */

import { useParams } from '@tanstack/react-router';
import { useBoardData, useGetTodos } from '~/lib/react-query';

import { CardContent, CardHeader, CardTitle } from '../ui';
import { Drag, DraggedChildrenProps, DropGuide, DropZone } from '../drag';
import TodoItem from '../todo-item';
import { TodoForm } from '../form';

function TodosList() {
  const { board: boardId } = useParams({ from: '/_auth/board/$board' });
  const { data: boardData } = useBoardData({ board: Number(boardId) });
  const { data: todosData } = useGetTodos({ board: Number(boardId) });

  function handleDrop() {
    // eslint-disable-next-line no-console
    console.log('DROPPED');
  }

  return (
    <Drag handleDrop={handleDrop}>
      {({ activeItem, activeType, isDragging }: DraggedChildrenProps) => {
        console.log('🚀 ~ TodosList ~ activeItem:', activeItem);
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
              </li>
              <DropZone
                dropId={`${0}-${todosData?.todos?.length}`}
                remember="true"
              >
                <DropGuide
                  dropId={`${0}-${todosData?.todos?.length}`}
                  className="m-2 h-24 rounded-lg bg-gray-200"
                />
              </DropZone>
            </ul>
          </>
        );
      }}
    </Drag>
  );
}

export default TodosList;
