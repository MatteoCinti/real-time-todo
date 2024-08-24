import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useGetUserToken } from '~/hooks';
import { gqlRequestClient } from '~/lib/graphql';
import {
  CreateBoardDocument,
  CreateBoardMutationVariables
} from '~/lib/graphql/__generated__/graphql';
import { userQueryKeys } from '../queries';

function useCreateBoard() {
  const token = useGetUserToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-board', CreateBoardDocument],
    mutationFn: async (variables: CreateBoardMutationVariables) =>
      gqlRequestClient({
        Authorization: `Bearer ${token}`
      }).request(CreateBoardDocument, variables),
    onSuccess: async (data) => {
      await queryClient.setQueryData(userQueryKeys(token), (oldData: any) => ({
        user: oldData.user,
        boards: [...oldData.boards, { ...data.createBoard }]
      }));
    }
  });
}

export default useCreateBoard;
