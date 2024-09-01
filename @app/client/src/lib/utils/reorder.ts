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

  const updatedTodos = todos.map((todo) => {
    if (todo.id === draggedTodoId) {
      return {
        ...todo,
        parentId: newParentId ?? 0,
        order: 0
      };
    }

    if (todo.parentId === draggedTodoId) {
      return {
        ...todo,
        parentId: newParentId,
        order: 0
      };
    }

    return {
      ...todo,
      order: 0
    };
  });

  const todosByParent = updatedTodos.reduce(
    (acc, todo) => {
      const parentId = todo.parentId ?? 0;
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(todo);
      return acc;
    },
    {} as Record<number, Todo[]>
  );

  const finalUpdatedTodos = Object.values(todosByParent).flatMap(
    (parentTodos) =>
      parentTodos.map((todo, index) => ({
        ...todo,
        order: indexToPosition(index)
      }))
  );

  return finalUpdatedTodos;
}
