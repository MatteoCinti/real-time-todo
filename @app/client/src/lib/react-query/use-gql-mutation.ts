import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useMutation } from '@tanstack/react-query';

import { gqlRequestClient } from '../graphql';

type Props<T, K> = {
  mutationKey: string[];
  mutationDocument: TypedDocumentNode<T, K>;
};

function useGqlMutation<T, K>({ mutationKey, mutationDocument }: Props<T, K>) {
  return useMutation({
    mutationKey: [...mutationKey, mutationDocument],
    mutationFn: async (variables: K extends Object ? K : undefined) =>
      gqlRequestClient.request(mutationDocument, variables)
  });
}

export default useGqlMutation;
