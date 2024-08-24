import { GetUserDataQuery } from '../graphql/__generated__/graphql';

export type UseUserData = {
  user: GetUserDataQuery['getUser'];
  boards: GetUserDataQuery['getUserBoards'];
};
