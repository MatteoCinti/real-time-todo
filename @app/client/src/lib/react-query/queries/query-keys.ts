import {
  GetBoardDataDocument,
  GetBoardDataQueryVariables,
  GetTodosDocument,
  GetTodosQueryVariables,
  GetUserDataDocument
} from '~/lib/graphql/__generated__/graphql';

export const userQueryKeys = (token: string) => {
  return ['user', GetUserDataDocument, token];
};

export const boardDataQueryKeys = (
  headers: { Authorization?: string; guest?: string },
  variables: GetBoardDataQueryVariables
) => {
  return ['board-data', GetBoardDataDocument, headers, variables];
};

export const todosQueryKeys = (variables: GetTodosQueryVariables) => {
  return ['get-todos', GetTodosDocument, variables];
};
