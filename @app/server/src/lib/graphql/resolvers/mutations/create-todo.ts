import { MutationCreateTodoArgs } from '../../__generated__/resolvers-types';
import { Todo } from '../../../database/models';
import { pubsub } from '../../../pubsub';

async function createTodo(_: unknown, args: MutationCreateTodoArgs) {
  const { board, title, description } = args;
  const todo = await Todo.create({ board, title, description });

  pubsub.publish('TODO_CREATED', {
    todoCreated: todo
  });

  return todo.dataValues as Todo;
}

export default createTodo;
