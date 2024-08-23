import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

import { gqlRequestClient } from '~/lib/graphql';
import { AUTH_COOKIE } from '~/lib/constants';

import {
  CreateBoardDocument,
  CreateBoardMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useCreateBoard() {
  const [cookies] = useCookies([AUTH_COOKIE]);
  const { token } = cookies[AUTH_COOKIE] ?? '';

  return useMutation({
    mutationKey: ['create-board', CreateBoardDocument],
    mutationFn: async (variables: CreateBoardMutationVariables) =>
      gqlRequestClient({
        Authorization: `Bearer ${token}`
      }).request(CreateBoardDocument, variables),
    onSuccess: async (data) => {
      console.log('Board created', data);
    }
  });
}

export default useCreateBoard;
