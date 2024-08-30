import { ActiveFilters } from '~/hooks';
import { useTodosData } from '../react-query/types';

function filterTodos(
  todos: useTodosData['todos'] | [],
  { showCompleted, textSearch }: ActiveFilters
) {
  if (!todos) return [];

  return todos.filter((todo) => {
    if (!todo) return false;
    if (!showCompleted) {
      return !todo.isDone;
    }

    if (textSearch) {
      const searchText = textSearch.toLowerCase();
      const titleMatches = todo.title?.toLowerCase().includes(searchText);
      const descriptionMatches = todo.description
        ?.toLowerCase()
        .includes(searchText);

      return titleMatches || descriptionMatches;
    }

    return true;
  });
}

export default filterTodos;
