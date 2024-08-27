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

export function updateTodoUpdatedCache(
  queryClient: QueryClient,
  updatedTodo: ListenTodoUpdatedSubscription['todoUpdated'],
  variables: ListenTodoUpdatedSubscriptionVariables
) {
  queryClient.setQueryData(
    todosQueryKeys(variables),
    (oldData: { todos: Todo[] }) => {
      if (!updatedTodo) return undefined;

      const oldTodos = oldData.todos ?? [];
      const updatedTodos = oldTodos.map((todo: Todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );

      return { todos: updatedTodos };
    }
  );
}

function useSubscribeTodoUpdates(
  variables: ListenTodoUpdatedSubscriptionVariables
) {
  const queryClient = useQueryClient();

  const { data: update } = useSubscription(ListenTodoUpdatedDocument, {
    client: apolloClient,
    variables
  });

  useEffect(() => {
    if (update?.todoUpdated) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ useEffect ~ update?.todoUpdated:', update?.todoUpdated);
      updateTodoUpdatedCache(queryClient, update.todoUpdated, variables);
    }
  }, [update, queryClient, variables]);

  return update;
}

export default useSubscribeTodoUpdates;
