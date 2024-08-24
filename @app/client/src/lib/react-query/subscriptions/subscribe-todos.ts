import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  ListenTodosDocument,
  ListenTodosSubscription,
  ListenTodosSubscriptionVariables
} from '~/lib/graphql/__generated__/graphql';
import { todosQueryKeys } from '../queries';

function addTodoToCache(
  queryClient: QueryClient,
  data: ListenTodosSubscription,
  variables: ListenTodosSubscriptionVariables
) {
  queryClient.setQueryData(todosQueryKeys(variables), (oldData: any) => {
    const createdTodo = data?.todoCreated ?? null;
    if (!createdTodo) return undefined;

    const oldTodos = oldData.todos ?? [];
    return { todos: [...oldTodos, createdTodo] };
  });
}

function useSubscribeToDos(variables: ListenTodosSubscriptionVariables) {
  const queryClient = useQueryClient();

  const { data } = useSubscription(ListenTodosDocument, {
    client: apolloClient,
    variables
  });

  useEffect(() => {
    if (data?.todoCreated) {
      console.log('🚀 ~ useEffect ~ data:', data);
      addTodoToCache(queryClient, data, variables);
    }
  }, [data, queryClient, variables]);

  return data;
}

export default useSubscribeToDos;
