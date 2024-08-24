import { MutationCreateTodoArgs } from '../../__generated__/resolvers-types';
import { Todo } from '../../../database/models';
import { pubsub } from '../../../pubsub';

async function createTodo(_: unknown, args: MutationCreateTodoArgs) {
  const { board, title, description } = args;
  let todo = await Todo.create({ board, title, description });
  todo = todo.toJSON();

  pubsub.publish('TODO_CREATED', {
    todoCreated: todo
  });

  return todo;
}

export default createTodo;
