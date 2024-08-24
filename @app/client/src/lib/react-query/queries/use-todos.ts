import { useQuery } from '@tanstack/react-query';

import { gqlRequestClient } from '~/lib/graphql';
import {
  GetTodosDocument,
  GetTodosQueryVariables
} from '~/lib/graphql/__generated__/graphql';

import { useTodosData } from '../types';
import { todosQueryKeys } from './query-keys';

function useGetTodos(variables: GetTodosQueryVariables) {
  return useQuery({
    queryKey: todosQueryKeys(variables),
    queryFn: async () => {
      const response = await gqlRequestClient().request(
        GetTodosDocument,
        variables
      );
      return {
        todos: response.getTodosByBoard
      } as useTodosData;
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  });
}

export default useGetTodos;
