import { Todo } from '../../../database/models';
import { MutationDeleteTodoArgs } from '../../__generated__/resolvers-types';

async function deleteTodo(_: unknown, args: MutationDeleteTodoArgs) {
  const { id } = args;

  const todo = await Todo.destroy({ where: { id } });

  if (!todo) {
    throw new Error('Todo not found');
  }
  return { id, deleted: true };
}

export default deleteTodo;
