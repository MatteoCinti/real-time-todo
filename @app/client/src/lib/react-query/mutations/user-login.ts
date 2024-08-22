import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { gqlRequestClient } from '~/lib/graphql';
import {
  UserLoginDocument,
  UserLoginQueryVariables
} from '~/lib/graphql/__generated__/graphql';
import { useAuth } from '~/hooks';

function useLogin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['user', UserLoginDocument],
    mutationFn: async (variables: UserLoginQueryVariables) =>
      gqlRequestClient.request(UserLoginDocument, variables),
    onSuccess: (data) => {
      if (data.userLogin) {
        signIn(data);
        navigate({ to: '/' });
      }
    }
  });
}

export default useLogin;
