import { Resolvers } from '../__generated__/resolvers-types';

import {
  getTodo,
  getUser,
  getBoard,
  userLogin,
  getUserBoards,
  getTodosByBoard
} from './queries/z';
import {
  createTodo,
  createUser,
  createBoard,
  deleteBoard
} from './mutations/p';
import { todoCreated } from './subscriptions/j';

export const resolvers: Resolvers = {
  Query: {
    getUser,
    getTodo,
    getBoard,
    userLogin,
    getUserBoards,
    getTodosByBoard
  },
  Mutation: {
    createTodo,
    createUser,
    createBoard,
    deleteBoard
  },
  Subscription: {
    todoCreated: {
      subscribe: todoCreated
    }
  }
};
