import { ActiveFilters } from '~/hooks';
import { useTodosData } from '../react-query/types';

function filterTodos(
  todos: useTodosData['todos'] | [],
  { showCompleted }: ActiveFilters
) {
  if (!todos) return [];

  return todos.filter((todo) => {
    if (!todo) return false;
    if (!showCompleted) {
      return !todo.isDone;
    }
    return true;
  });
}

export default filterTodos;
