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
  newCardPosition: number
): Todo[] {
  const oldIndex = todos.findIndex((todo) => todo.id === draggedTodoId);
  let newIndex = positionToIndex(newCardPosition);

  if (oldIndex < newIndex) {
    // eslint-disable-next-line no-plusplus
    newIndex--;
  }

  const [draggedTodo] = todos.splice(oldIndex, 1);
  todos.splice(newIndex, 0, draggedTodo);
  const updatedTodos = todos.map((todo, index) => ({
    ...todo,
    order: indexToPosition(index)
  }));

  return updatedTodos;
}
