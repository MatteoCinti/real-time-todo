import {
  GetBoardDataQuery,
  GetTodosQuery,
  GetUserDataQuery
} from '../graphql/__generated__/graphql';

export type UseUserData = {
  user: GetUserDataQuery['getUser'];
  boards: GetUserDataQuery['getUserBoards'];
};

export type UseBoardData = {
  board: GetBoardDataQuery['getBoard'];
};

export type useTodosData = {
  todos: GetTodosQuery['getTodosByBoard'];
};
