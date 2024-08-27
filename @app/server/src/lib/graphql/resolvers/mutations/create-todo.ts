import { MutationCreateTodoArgs } from '../../__generated__/resolvers-types';
import { Todo } from '../../../database/models';
import { pubsub } from '../../../pubsub';

async function createTodo(_: unknown, args: MutationCreateTodoArgs) {
  const { board, title, description, order, parentId } = args;

  let todo = await Todo.create({
    board,
    title,
    description,
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
