import { GraphQLError } from 'graphql';

import { MutationUpdateTodoArgs } from '../../__generated__/resolvers-types';
import { Todo } from '../../../database/models';
import { pubsub } from '../../../pubsub';

async function updateTodo(_: unknown, args: MutationUpdateTodoArgs) {
  const { id, title, description, isDone } = args;
  const todo = await Todo.findOne({ where: { id } });

  if (!todo) {
    throw new GraphQLError('Todo not found');
  }

  await todo.update({
    title: title ?? todo.title,
    description: description ?? todo.description,
    isDone: isDone ?? todo.isDone
  });

  await todo.save();

  pubsub.publish('TODO_UPDATED', {
    todoUpdated: todo
  });

  return todo.toJSON()! as Todo;
}

export default updateTodo;
