import { PubSub, withFilter } from 'graphql-subscriptions';
import { Resolvers } from './__generated__/resolvers-types';
import { Todo } from '../database/models/associations';

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
    getTodos: () => todos
  },
  Mutation: {
    createTodo: async (_, args) => {
      const { board, title, description } = args;
      console.log('🚀 ~ createTodo: ~ title:', title);
      const todo = await Todo.create({ board, title, description });

      // eslint-disable-next-line no-console
      console.log('🚀 ~ todo:', todo);

      pubsub.publish('TODO_CREATED', {
        todoCreated: { board, title, description }
      });

      return todo.dataValues as Todo;
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
