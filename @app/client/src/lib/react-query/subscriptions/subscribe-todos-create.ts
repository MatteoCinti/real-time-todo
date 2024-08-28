import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  ListenTodoCreatedDocument,
  ListenTodoCreatedSubscription,
  ListenTodoCreatedSubscriptionVariables,
  Todo
} from '~/lib/graphql/__generated__/graphql';
import { todosQueryKeys } from '../queries';

export function addTodoToCache(
  queryClient: QueryClient,
  createdTodo: ListenTodoCreatedSubscription['todoCreated'],
  variables: ListenTodoCreatedSubscriptionVariables
) {
  queryClient.setQueryData(
    todosQueryKeys(variables),
    (oldData: { todos: Todo[] }) => {
      if (!createdTodo) return undefined;

      const oldTodos = oldData.todos ?? [];
      return { todos: [...oldTodos, createdTodo] };
    }
  );
}

function useSuscribeTodoCreate(
  variables: ListenTodoCreatedSubscriptionVariables
) {
  const queryClient = useQueryClient();

  const { data: create } = useSubscription(ListenTodoCreatedDocument, {
    client: apolloClient,
    variables
  });

  useEffect(() => {
    if (create?.todoCreated) {
      addTodoToCache(queryClient, create?.todoCreated, variables);
      //   queryClient.invalidateQueries({ queryKey: todosQueryKeys(variables) });
    }
  }, [create, queryClient, variables]);

  return create;
}

export default useSuscribeTodoCreate;
