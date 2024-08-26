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
  deleteBoard,
  updateTodo,
  deleteTodo
} from './mutations/p';
import { todoCreated, todoUpdated } from './subscriptions/j';

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
    deleteBoard,
    updateTodo,
    deleteTodo
  },
  Subscription: {
    todoCreated: {
      subscribe: todoCreated
    },
    todoUpdated: {
      subscribe: todoUpdated
    }
  }
};
