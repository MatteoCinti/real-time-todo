import { PubSub, withFilter } from 'graphql-subscriptions';
import { Resolvers } from '../__generated__/resolvers-types';
import { Board, Todo, User } from '../../database/models/associations';
import { hashPassword } from '../../utils';
import {
  userLogin,
  getUser,
  getUserBoards,
  getBoard,
  getTodosByBoard
} from './queries';

const pubsub = new PubSub();

export const resolvers: Resolvers = {
  Query: {
    getUser,
    getBoard,
    userLogin,
    getUserBoards,
    getTodosByBoard
  },
  Mutation: {
    createTodo: async (_, args) => {
      const { board, title, description } = args;
      const todo = await Todo.create({ board, title, description });

      pubsub.publish('TODO_CREATED', {
        todoCreated: todo
      });

      return todo.dataValues as Todo;
    },
    createUser: async (_, args) => {
      const { username, password, firstName } = args;
      const hashedPassword = hashPassword(password);

      const user = await User.create({
        username,
        firstName,
        password: hashedPassword
      });

      return user.dataValues as User;
    },
    createBoard: async (_, args) => {
      const { owner, title } = args;
      const board = await Board.create({ owner, title });

      return board.dataValues as Board;
    }
  },

  Subscription: {
    todoCreated: {
      subscribe: (_parent, args, _context) => {
        return {
          [Symbol.asyncIterator]: withFilter(
            () => pubsub.asyncIterator('TODO_CREATED'),
            (payload, _, __) => {
              return payload.todoCreated.board === args.board;
            }
          )
        };
      }
    }
  }
};
