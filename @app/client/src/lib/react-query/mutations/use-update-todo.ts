import { useMutation } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';

import {
  UpdateTodoDocument,
  UpdateTodoMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useUpdateTodo(todoId: UpdateTodoMutationVariables['id']) {
  return useMutation({
    mutationKey: ['update-todo', UpdateTodoDocument, todoId],
    mutationFn: async (variables: UpdateTodoMutationVariables) =>
      gqlRequestClient().request(UpdateTodoDocument, variables),
    onSuccess(data) {
      console.log('🚀 ~ onSuccess ~ data:', data);
    }
  });
}

export default useUpdateTodo;
