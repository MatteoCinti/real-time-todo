/* eslint-disable */
import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  //   GetTodosQuery,
  ListenTodosDocument,
  ListenTodosSubscription
} from '~/lib/graphql/__generated__/graphql';

type SubscriptionProps = {
  boardId: string;
};

function addTodoToCache(
  _queryClient: QueryClient,
  _data: ListenTodosSubscription
) {
  //   queryClient.setQueryData(['todos', GetTodosDocument], (oldData: any) => {
  //     const createdTodo = data?.todoCreated ?? null;
  //     if (!createdTodo) return undefined;
  //     const oldTodos = oldData?.getTodos ?? [];
  //     const returnData = [createdTodo, ...oldTodos];
  //     return { getTodos: returnData };
  //   });
}

function SubscribeToDos({ boardId }: SubscriptionProps) {
  const queryClient = useQueryClient();

  const { data } = useSubscription(ListenTodosDocument, {
    client: apolloClient,
    variables: { board: boardId }
  });

  useEffect(() => {
    if (data?.todoCreated) {
      addTodoToCache(queryClient, data);
    }
  }, [data, queryClient]);
}

export default SubscribeToDos;
