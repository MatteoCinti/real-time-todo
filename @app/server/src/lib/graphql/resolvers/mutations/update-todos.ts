import { GraphQLError } from 'graphql';
import { Todo } from '../../../database/models';
import { MutationUpdateTodosArgs } from '../../__generated__/resolvers-types';
import { pubsub } from '../../../pubsub';

async function updateTodos(
  _: unknown,
  { todos, board }: MutationUpdateTodosArgs
) {
  if (!board) {
    throw new GraphQLError('Board is necessary');
  }
  const updatedTodos = await Promise.all(
    todos.map(async (input) => {
      const { id, title, description, isDone, order, parentId } = input;
      if (!id) {
        throw new GraphQLError('Id is necessary');
      }
      const todo = await Todo.findOne({ where: { id } });
      if (!todo) {
        throw new GraphQLError('Todo not found');
      }

      const updatedTodo = await todo.update({
        title: title ?? todo.title,
        description: description ?? todo.description,
        isDone: isDone ?? todo.isDone,
        order: order ?? todo.order,
        parentId: parentId ?? todo.parentId
      });
      return updatedTodo.toJSON() as Todo;
    })
  );

  pubsub.publish('TODOS_UPDATED', {
    board,
    todosUpdated: updatedTodos as Todo[]
  });

  return updatedTodos;
}

export default updateTodos;
