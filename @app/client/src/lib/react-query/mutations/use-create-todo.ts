import { useMutation } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';

import {
  CreateTodoDocument,
  CreateTodoMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useCreateTodo(board: number) {
  return useMutation({
    mutationKey: ['create-todo', CreateTodoDocument, board],
    mutationFn: async (variables: CreateTodoMutationVariables) =>
      gqlRequestClient().request(CreateTodoDocument, variables)
  });
}

export default useCreateTodo;
