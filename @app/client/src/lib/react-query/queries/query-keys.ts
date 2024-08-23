import { GetUserDataDocument } from '~/lib/graphql/__generated__/graphql';

export const userQueryKeys = (token: string) => {
  return ['user', GetUserDataDocument, token];
};
