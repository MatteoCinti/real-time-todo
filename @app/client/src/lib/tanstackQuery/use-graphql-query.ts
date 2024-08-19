import { useQuery } from '@tanstack/react-query';
import request, { RequestDocument } from 'graphql-request';

type Props = {
  queryKey: string[];
  queryDocument: RequestDocument;
};

function useGqlQuery({ queryKey, queryDocument }: Props) {
  return useQuery({
    queryKey: [...queryKey, queryDocument],
    queryFn: async () =>
      request(`${import.meta.env.VITE_BACKEND_URL}/graphql`, queryDocument)
  });
}

export default useGqlQuery;
