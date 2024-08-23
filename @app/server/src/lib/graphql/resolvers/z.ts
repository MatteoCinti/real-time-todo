import { Resolvers } from '../__generated__/resolvers-types';

import {
  userLogin,
  getUser,
  getUserBoards,
  getBoard,
  getTodosByBoard
} from './queries/q';
import { createTodo, createUser, createBoard } from './mutations';
import { todoCreated } from './subscriptions';

export const resolvers: Resolvers = {
  Query: {
    getUser,
    getBoard,
    userLogin,
    getUserBoards,
    getTodosByBoard
  },
  Mutation: {
    createTodo,
    createUser,
    createBoard
  },
  Subscription: {
    todoCreated: {
      subscribe: todoCreated
    }
  }
};
