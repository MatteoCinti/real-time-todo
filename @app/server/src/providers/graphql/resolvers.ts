import { PubSub, withFilter } from 'graphql-subscriptions';
import { Resolvers } from './__generated__/resolvers-types';

const pubsub = new PubSub();

const todos = [
  {
    id: '1',
    board: '1',
    title: 'The Awakening',
    author: 'Kate Chopin',
    description: 'some description'
  },
  {
    id: '2',
    board: '1',
    title: 'City of Glass',
    author: 'Paul Auster',
    description: 'some description'
  }
];

export const resolvers: Resolvers = {
  Query: {
    getTodos: () => todos
  },
  Mutation: {
    createTodo: (_, { board, title, author, description }) => {
      const id = String(todos.length + 1);

      pubsub.publish('TODO_CREATED', {
        todoCreated: { board, title, author, description, id }
      });
      const todo = { board, title, author, description, id };
      todos.push(todo);
      return todo;
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
