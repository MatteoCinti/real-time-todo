import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  ListenTodoCreatedDocument,
  ListenTodoCreatedSubscription,
  ListenTodoCreatedSubscriptionVariables
} from '~/lib/graphql/__generated__/graphql';
import { todosQueryKeys } from '../queries';

function addTodoToCache(
  queryClient: QueryClient,
  data: ListenTodoCreatedSubscription,
  variables: ListenTodoCreatedSubscriptionVariables
) {
  queryClient.setQueryData(todosQueryKeys(variables), (oldData: any) => {
    const createdTodo = data?.todoCreated ?? null;
    if (!createdTodo) return undefined;

    const oldTodos = oldData.todos ?? [];
    return { todos: [...oldTodos, createdTodo] };
  });
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
      addTodoToCache(queryClient, create, variables);
    }
  }, [create, queryClient, variables]);

  return create;
}

export default useSuscribeTodoCreate;
