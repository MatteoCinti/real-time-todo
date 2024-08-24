import {
  GetBoardDataQuery,
  GetUserDataQuery
} from '../graphql/__generated__/graphql';

export type UseUserData = {
  user: GetUserDataQuery['getUser'];
  boards: GetUserDataQuery['getUserBoards'];
};

export type UseBoardData = {
  board: GetBoardDataQuery['getBoard'];
  todos: GetBoardDataQuery['getTodosByBoard'];
};
