/* eslint-disable  no-param-reassign */
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
  const isMovingToSubtask = newParentId !== 0 && newParentId !== undefined;

  // Find the dragged todo and check if it was a subtask
  const draggedTodo = todos.find((todo) => todo.id === draggedTodoId);
  if (!draggedTodo) return todos;
  const wasSubtask = draggedTodo.parentId !== null;

  // Separate parent tasks and subtasks
  const parentTasks = todos.filter((todo) => !todo.parentId);
  const subTasks = todos.filter((todo) => todo.parentId);
  const parentItem = todos.find((todo) => todo.id === draggedTodo.parentId);

  // Find the current index of the dragged todo
  const oldIndex = wasSubtask
    ? subTasks.findIndex((todo) => todo.id === draggedTodoId)
    : parentTasks.findIndex((todo) => todo.id === draggedTodoId);

  // Adjust new index if moving down
  // if it was a subtask this condition needs to check the parent order
  // to make sure we are going down
  let newIndex = newCardPosition;
  if (
    (oldIndex < newIndex && !wasSubtask) ||
    (wasSubtask && parentItem && parentItem.order < newIndex)
  ) {
    newIndex--;
  }

  // Find all subtasks of the dragged parent task
  const draggedSubtasks = todos.filter(
    (todo) => todo.parentId === draggedTodoId
  );

  // Remove the dragged todo (and its subtasks if it's a parent) from its current list
  let removedTodo: Todo;
  if (wasSubtask) {
    [removedTodo] = subTasks.splice(oldIndex, 1);
  } else {
    [removedTodo] = parentTasks.splice(oldIndex, 1);
    // Remove the subtasks from the subTasks list
    draggedSubtasks.forEach((subtask) => {
      const subtaskIndex = subTasks.findIndex((todo) => todo.id === subtask.id);
      if (subtaskIndex !== -1) {
        subTasks.splice(subtaskIndex, 1);
      }
    });
  }

  // Handle moving to subtask or parent task
  if (isMovingToSubtask) {
    const targetSubtasks = subTasks.filter(
      (todo) => todo.parentId === newParentId && todo.id !== draggedTodoId
    );
    targetSubtasks.splice(newIndex, 0, removedTodo);

    // Reorder the subtasks under the new parent
    targetSubtasks.forEach((subTask, index) => {
      subTask.parentId = newParentId;
      subTask.order = index;
    });

    subTasks.push(...targetSubtasks);

    // Update the parentId and order for the dragged subtasks as well
    draggedSubtasks.forEach((subtask) => {
      subtask.parentId = newParentId;
      subtask.order = targetSubtasks.length;
      subTasks.push(subtask);
    });
  } else {
    removedTodo.parentId = null;
    parentTasks.splice(newIndex, 0, removedTodo);

    parentTasks.forEach((parentTask, index) => {
      parentTask.order = index;
    });

    // If moving a parent task to be a parent, its subtasks should remain as subtasks
    draggedSubtasks.forEach((subtask) => {
      subTasks.push(subtask);
    });
  }

  // Combine parent tasks and subtasks, then remove duplicates
  const combinedTodos = [...parentTasks, ...subTasks];
  const uniqueTodosMap: Record<number, Todo> = {};

  // Create a map with unique todos
  combinedTodos.forEach((todo) => {
    uniqueTodosMap[todo.id] = todo;
  });

  // Convert the map back to an array and sort it by the 'order' property
  const uniqueSortedTodos = Object.values(uniqueTodosMap).sort(
    (a, b) => a.order - b.order
  );

  return uniqueSortedTodos;
}
