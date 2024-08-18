import { PubSub, withFilter } from 'graphql-subscriptions';
import { Resolvers } from './__generated__/resolvers-types';

const pubsub = new PubSub();

const todos = [
  {
    board: '1',
    title: 'The Awakening',
    author: 'Kate Chopin',
    description: 'some description'
  },
  {
    board: '1',
    title: 'City of Glass',
    author: 'Paul Auster',
    description: 'some description'
  }
];

export const resolvers: Resolvers = {
  Query: {
    todos: () => todos
  },
  Mutation: {
    createTodo: (_, { board, title, author, description }) => {
      pubsub.publish('TODO_CREATED', {
        todoCreated: { board, title, author, description }
      });
      const todo = { board, title, author, description };
      todos.push(todo);
      return todo;
    }
  },

  Subscription: {
    todoCreated: {
      subscribe: (_parent, _args, _context) => {
        return {
          [Symbol.asyncIterator]: withFilter(
            () => pubsub.asyncIterator('TODO_CREATED'),
            (payload, variables, __) => {
              // eslint-disable-next-line no-console
              console.log('🚀 ~ variables:', variables);
              // Only push an update if the comment is on
              // the correct repository for this operation
              return payload.todoCreated.board === '1';
            }
          )
        };
      }
    }
  }
};
