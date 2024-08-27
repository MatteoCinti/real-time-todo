import { useMutation } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';

import {
  UpdateTodoDocument,
  UpdateTodoMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useUpdateTodo() {
  return useMutation({
    mutationKey: ['update-todo', UpdateTodoDocument],
    mutationFn: async (variables: UpdateTodoMutationVariables) =>
      gqlRequestClient().request(UpdateTodoDocument, variables)
  });
}

export default useUpdateTodo;
