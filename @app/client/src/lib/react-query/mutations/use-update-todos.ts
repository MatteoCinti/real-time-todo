import { useMutation } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';

import {
  UpdateTodosDocument,
  UpdateTodosMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useUpdateTodo() {
  return useMutation({
    mutationKey: ['update-todo', UpdateTodosDocument],
    mutationFn: async (variables: UpdateTodosMutationVariables) =>
      gqlRequestClient().request(UpdateTodosDocument, variables)
  });
}

export default useUpdateTodo;
