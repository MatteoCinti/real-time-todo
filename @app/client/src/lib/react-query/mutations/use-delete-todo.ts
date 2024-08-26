import { useMutation } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';

import {
  DeleteTodoDocument,
  DeleteTodoMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useDeleteTodo() {
  return useMutation({
    mutationKey: ['todo-delete', DeleteTodoDocument],
    mutationFn: async (variables: DeleteTodoMutationVariables) =>
      gqlRequestClient().request(DeleteTodoDocument, variables)
  });
}

export default useDeleteTodo;
