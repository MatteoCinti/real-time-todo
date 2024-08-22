import { PubSub, withFilter } from 'graphql-subscriptions';
import jwt from 'jsonwebtoken';
import { Resolvers } from './__generated__/resolvers-types';
import { Board, Todo, User } from '../database/models/associations';
import { hashPassword } from '../utils';
import { checkPassword } from '../utils/password';

const pubsub = new PubSub();

export const resolvers: Resolvers = {
  Query: {
    getUser: async (_, args) => {
      const { id } = args;
      const user = await User.findOne({ where: { id } });
      return user!.toJSON() as User;
    },
    userLogin: async (_, args) => {
      const { username, password } = args;
      const user = await User.findOne({ where: { username } });
      if (!user) throw new Error('User not found');
      const userResponse = await user.toJSON();
      const passwordValid = await checkPassword(
        password,
        userResponse.password
      );
      if (!passwordValid) throw new Error('Invalid password');
      const token = jwt.sign(userResponse, process.env.JWT_SECRET!);
      return { ...userResponse, id: userResponse.id!, token };
    },
    getBoards: async (_, args) => {
      const { owner } = args;
      const boards = await Board.findAll({ where: { owner } });

      return boards.map((board) => board.toJSON()) as Board[];
    },
    getBoard: async (_, args) => {
      const { owner, id } = args;
      const board = await Board.findOne({ where: { owner, id } });

      return board!.toJSON() as Board;
    },
    getTodosByBoard: async (_, args) => {
      const { board } = args;
      const boardTodos = await Todo.findAll({ where: { board } });

      return boardTodos.map((todo) => todo.toJSON()) as Todo[];
    }
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
