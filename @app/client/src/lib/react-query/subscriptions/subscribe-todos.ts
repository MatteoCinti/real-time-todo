import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  ListenTodosDocument,
  ListenTodosSubscription,
  ListenTodosSubscriptionVariables
} from '~/lib/graphql/__generated__/graphql';
import { useGetUserToken } from '~/hooks';
import { boardDataQueryKeys } from '../queries/query-keys';

function addTodoToCache(
  queryClient: QueryClient,
  data: ListenTodosSubscription,
  token: string,
  variables: ListenTodosSubscriptionVariables
) {
  queryClient.setQueryData(
    boardDataQueryKeys(token, variables),
    (oldData: any) => {
      const createdTodo = data?.todoCreated ?? null;
      if (!createdTodo) return undefined;

      const { board } = oldData;
      const oldTodos = oldData.todos ?? [];
      return { board, todos: [...oldTodos, createdTodo] };
    }
  );
}

function useSubscribeToDos(variables: ListenTodosSubscriptionVariables) {
  const queryClient = useQueryClient();
  const token = useGetUserToken();

  const { data } = useSubscription(ListenTodosDocument, {
    client: apolloClient,
    variables
  });

  useEffect(() => {
    if (data?.todoCreated) {
      addTodoToCache(queryClient, data, token, variables);
    }
  }, [data, queryClient, token, variables]);

  return data;
}

export default useSubscribeToDos;
