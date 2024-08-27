import { GraphQLError } from 'graphql';

import { MutationCreateTodoArgs } from '../../__generated__/resolvers-types';
import { Todo } from '../../../database/models';
import { pubsub } from '../../../pubsub';

async function createTodo(_: unknown, args: MutationCreateTodoArgs) {
  const { board, title, description, order, parentId } = args.todo;

  if (!board) {
    throw new GraphQLError('Board is required');
  }
  if (!title) {
    throw new GraphQLError('Title is required');
  }

  let todo = await Todo.create({
    board,
    title,
    description: description ?? '',
    order: order ?? 0,
    parentId: parentId ?? null
  });
  todo = todo.toJSON();

  pubsub.publish('TODO_CREATED', {
    todoCreated: todo
  });

  return todo;
}

export default createTodo;
