import { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { apolloClient } from '~/lib/graphql';

import {
  ListenTodoDeletedDocument,
  ListenTodoDeletedSubscriptionVariables,
  ListenTodoDeletedSubscription,
  Todo
} from '~/lib/graphql/__generated__/graphql';
import { todosQueryKeys } from '../queries';

export function updateTodoDeletedCache(
  queryClient: QueryClient,
  deletedTodo: ListenTodoDeletedSubscription['todoDeleted'],
  variables: ListenTodoDeletedSubscriptionVariables
) {
  queryClient.setQueryData(
    todosQueryKeys(variables),
    (oldData: { todos: Todo[] }) => {
      if (!deletedTodo) return undefined;

      const oldTodos = oldData.todos ?? [];
      const updatedTodos = oldTodos.filter(
        (todo: Todo) => todo.id !== deletedTodo.id
      );

      return { todos: updatedTodos };
    }
  );
}

function useSubscribeTodoDelete(
  variables: ListenTodoDeletedSubscriptionVariables
) {
  const queryClient = useQueryClient();

  const { data: deleted } = useSubscription(ListenTodoDeletedDocument, {
    client: apolloClient,
    variables
  });

  useEffect(() => {
    if (deleted?.todoDeleted) {
      updateTodoDeletedCache(queryClient, deleted.todoDeleted, variables);
    }
  }, [deleted, queryClient, variables]);

  return deleted;
}

export default useSubscribeTodoDelete;
