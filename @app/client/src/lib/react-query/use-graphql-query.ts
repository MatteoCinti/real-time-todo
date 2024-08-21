import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery } from '@tanstack/react-query';

import { gqlRequestClient } from '../graphql';

type Props<T, K> = {
  queryKey: string[];
  queryDocument: TypedDocumentNode<T, K>;
  variables?: K extends Object ? K : undefined;
};

function useGqlQuery<T, K>({
  queryKey,
  queryDocument,
  variables
}: Props<T, K>) {
  return useQuery({
    queryKey: [...queryKey, queryDocument, variables],
    queryFn: async () => gqlRequestClient.request(queryDocument, variables)
  });
}

export default useGqlQuery;
