import { GraphQLError } from 'graphql';
import { Todo } from '../../../database/models';
import { QueryGetTodoArgs } from '../../__generated__/resolvers-types';

async function getTodo(_: unknown, args: QueryGetTodoArgs) {
  const { id } = args;
  if (!id) {
    throw new GraphQLError('Todo not found');
  }
  const todo = await Todo.findOne({ where: { id } });
  if (!todo) {
    throw new GraphQLError('Todo not found');
  }
  return todo.toJSON() as Todo;
}

export default getTodo;
