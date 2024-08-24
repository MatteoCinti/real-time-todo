import { useMutation } from '@tanstack/react-query';
import { gqlRequestClient } from '~/lib/graphql';
import {
  DeleteBoardDocument,
  DeleteBoardMutationVariables
} from '~/lib/graphql/__generated__/graphql';

function useDeleteBoard() {
  return useMutation({
    mutationKey: ['user', DeleteBoardDocument],
    mutationFn: async (variables: DeleteBoardMutationVariables) =>
      gqlRequestClient().request(DeleteBoardDocument, variables),
    onSuccess: async (data) => {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ onSuccess: ~ data:', data);
    }
  });
}

export default useDeleteBoard;
