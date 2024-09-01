import { useState } from 'react';

import { Todo } from '~/lib/graphql/__generated__/graphql';

import { DraggedChildrenProps } from '../drag';
import SubtaskList from '../subtasks-list';
import TodoItem from '../todo-item';

type Props = DraggedChildrenProps & {
  todo: Todo;
  hasSubMenu?: boolean;
};

function TopLevelTodo({
  todo,
  activeItem,
  isDragging,
  hasSubMenu,
  activeType
}: Props) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  return (
    <>
      <TodoItem
        todo={todo}
        activeItem={activeItem}
        isDragging={isDragging}
        hasSubMenu={hasSubMenu}
        activeType={activeType}
        submenuOpen={submenuOpen}
        setSubmenuOpen={setSubmenuOpen}
      />
      <div
        className="h-2 w-full"
        onDragEnter={() => {
          setSubmenuOpen(true);
        }}
      />

      {submenuOpen && (
        <SubtaskList
          className="ml-8 mt-[-9px]"
          activeItem={activeItem}
          isDragging={isDragging}
          activeType={activeType}
          parentTodo={todo}
        />
      )}
    </>
  );
}

export default TopLevelTodo;
