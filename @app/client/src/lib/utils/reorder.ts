import { Todo } from '../graphql/__generated__/graphql';

export function indexToPosition(index: number) {
  return index + 1;
}

export function positionToIndex(position: number) {
  if (position === 0) {
    return 1;
  }
  return position - 1;
}

export function reorderTodos(
  todos: Todo[],
  draggedTodoId: number,
  newCardPosition: number,
  newParentId?: number
): Todo[] {
  const oldIndex = todos.findIndex((todo) => todo.id === draggedTodoId);
  let newIndex = positionToIndex(newCardPosition);

  if (oldIndex < newIndex) {
    newIndex--;
  }

  const [draggedTodo] = todos.splice(oldIndex, 1);
  todos.splice(newIndex, 0, draggedTodo);

  const updatedTodos = todos.map((todo, index) => {
    const isDraggedTodo = todo.id === draggedTodoId;

    if (isDraggedTodo) {
      const isSubtask = newParentId !== 0 && newParentId !== undefined;

      return {
        ...todo,
        parentId: isSubtask ? newParentId : 0,
        order: indexToPosition(index)
      };
    }

    if (todo.parentId === draggedTodoId) {
      return {
        ...todo,
        parentId: newParentId,
        order: indexToPosition(index)
      };
    }

    return {
      ...todo,
      order: indexToPosition(index)
    };
  });

  return updatedTodos;
}
