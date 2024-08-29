import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  ListenTodoUpdatedDocument,
  ListenTodoUpdatedSubscriptionVariables,
  ListenTodoUpdatedSubscription,
  Todo
} from '~/lib/graphql/__generated__/graphql';
import { todosQueryKeys } from '../queries';

export function updateGetTodosCache(
  queryClient: QueryClient,
  updatedTodos: ListenTodoUpdatedSubscription['todosUpdated'],
  variables: ListenTodoUpdatedSubscriptionVariables
) {
  queryClient.setQueryData(
    todosQueryKeys(variables),
    (oldData: { todos: Todo[] }) => {
      if (!updatedTodos) return undefined;

      const oldTodos = oldData.todos ?? [];

      const newTodos = oldTodos.map((todo: Todo) => {
        const updatedTodo = updatedTodos.find((ut) => ut!.id === todo.id);
        return updatedTodo ?? todo;
      });
      const sortedTodos = newTodos.sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
      );

      return { todos: sortedTodos };
    }
  );
}

function useSubscribeTodoUpdates(
  variables: ListenTodoUpdatedSubscriptionVariables
) {
  const queryClient = useQueryClient();

  const { data: update, error: updateError } = useSubscription(
    ListenTodoUpdatedDocument,
    {
      client: apolloClient,
      variables
    }
  );

  useEffect(() => {
    if (update?.todosUpdated) {
      updateGetTodosCache(queryClient, update.todosUpdated, variables);
      //   queryClient.invalidateQueries({ queryKey: todosQueryKeys(variables) });
    }
  }, [update, queryClient, variables]);

  return { update, updateError };
}

export default useSubscribeTodoUpdates;
