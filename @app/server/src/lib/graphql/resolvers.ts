import { PubSub, withFilter } from 'graphql-subscriptions';
import { Resolvers } from './__generated__/resolvers-types';
import { Todo, User } from '../database/models/associations';
import { hashPassword } from '../utils';

const pubsub = new PubSub();

const todos = [
  {
    id: 1,
    board: 1,
    title: 'The Awakening',
    description: 'some description',
    isDone: false
  },
  {
    id: 2,
    board: 1,
    title: 'City of Glass',
    description: 'some description',
    isDone: true
  }
] as Todo[];

export const resolvers: Resolvers = {
  Query: {
    getTodos: () => todos,
    getUser: async (_, args) => {
      const { username, password } = args;
      const user = await User.findOne({ where: { username, password } });
      return user?.dataValues as User;
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
      // eslint-disable-next-line no-console
      console.log('🚀 ~ createUser: ~ user:', hashedPassword);

      const user = await User.create({
        username,
        firstName,
        password: hashedPassword
      });

      // eslint-disable-next-line no-console
      console.log('🚀 ~ createUser: ~ user:', user);
      return user.dataValues as User;
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
