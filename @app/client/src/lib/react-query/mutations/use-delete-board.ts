import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetUserToken } from '~/hooks';
import { gqlRequestClient } from '~/lib/graphql';

import {
  DeleteBoardDocument,
  DeleteBoardMutationVariables
} from '~/lib/graphql/__generated__/graphql';
import { userQueryKeys } from '../queries';
import { UseUserData } from '../types';

function useDeleteBoard() {
  const token = useGetUserToken();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['board-delete', DeleteBoardDocument],
    mutationFn: async (variables: DeleteBoardMutationVariables) =>
      gqlRequestClient({
        Authorization: `Bearer ${token}`
      }).request(DeleteBoardDocument, variables),

    onSuccess: async (data) => {
      queryClient.setQueryData(userQueryKeys(token), (oldData: UseUserData) => {
        const { boards, user } = oldData;
        if (!boards || !user) return oldData;

        const updatedBoards = boards.filter(
          (board: any) => board.id !== data.deleteBoard.id
        );

        return {
          user,
          boards: [...updatedBoards]
        };
      });
    }
  });
}

export default useDeleteBoard;
