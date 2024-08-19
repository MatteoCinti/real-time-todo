import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { useQueryClient } from '@tanstack/react-query';
import { GetTodosDocument, apolloClient } from '~/lib/graphql';

import {
  GetTodosQuery,
  ListenTodosDocument
} from '~/lib/graphql/__generated__/graphql';

function SubscribeToDos() {
  const { data } = useSubscription(ListenTodosDocument, {
    client: apolloClient
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.todoCreated) {
      queryClient.setQueryData(
        ['todos', GetTodosDocument],
        (oldData: GetTodosQuery) => {
          const createdTodo = data?.todoCreated ?? null;
          if (!createdTodo) return undefined;

          const oldTodos = oldData?.getTodos ?? [];
          const returnData = [createdTodo, ...oldTodos];
          return { getTodos: returnData };
        }
      );
    }
  }, [data, queryClient]);
}

export default SubscribeToDos;
