import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useQuery } from '@tanstack/react-query';

import { gqlRequestClient } from '../graphql';

type Props<T, K> = {
  queryKey: string[];
  queryDocument: TypedDocumentNode<T, K>;
};

function useGqlQuery<T, K>({ queryKey, queryDocument }: Props<T, K>) {
  return useQuery({
    queryKey: [...queryKey, queryDocument],
    queryFn: async () => gqlRequestClient.request(queryDocument)
  });
}

export default useGqlQuery;
