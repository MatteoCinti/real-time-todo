import { Todo } from '../../../database/models';
import { MutationDeleteTodoArgs } from '../../__generated__/resolvers-types';
import { pubsub } from '../../../pubsub';

async function deleteTodo(_: unknown, args: MutationDeleteTodoArgs) {
  const { id, board } = args;

  const deleted = await Todo.destroy({ where: { id } });
  if (!deleted) {
    throw new Error('Todo not found');
  }

  const todoDeleted = { id, deleted: true, board };

  pubsub.publish('TODO_DELETED', {
    todoDeleted
  });

  return todoDeleted;
}

export default deleteTodo;
