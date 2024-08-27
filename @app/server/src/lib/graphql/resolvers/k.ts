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
  deleteTodo,
  updateTodos
} from './mutations/p';
import { todoCreated, todosUpdated, todoDeleted } from './subscriptions/j';

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
    deleteTodo,
    updateTodos
  },
  Subscription: {
    todoCreated: {
      subscribe: todoCreated
    },
    todosUpdated: {
      subscribe: todosUpdated
    },
    todoDeleted: {
      subscribe: todoDeleted
    }
  }
};
