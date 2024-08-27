import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import { gqlRequestClient } from '~/lib/graphql';
import {
  UserRegisterDocument,
  UserRegisterMutationVariables
} from '~/lib/graphql/__generated__/graphql';
import { useAuth } from '~/hooks';

function useRegister() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['user', UserRegisterDocument],
    mutationFn: async (variables: UserRegisterMutationVariables) =>
      gqlRequestClient().request(UserRegisterDocument, variables),
    onSuccess: async (data) => {
      if (data.createUser) {
        await signIn(data.createUser);
        navigate({ to: '/board' });
      }
    }
  });
}

export default useRegister;
