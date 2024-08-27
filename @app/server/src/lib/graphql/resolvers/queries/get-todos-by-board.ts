import { Todo } from '../../../database/models';
import { QueryGetTodosByBoardArgs } from '../../__generated__/resolvers-types';

async function getTodosByBoard(_: unknown, args: QueryGetTodosByBoardArgs) {
  const { board } = args;
  const boardTodos = await Todo.findAll({
    where: { board },
    order: [['order', 'ASC']]
  });

  return boardTodos.map((todo) => todo.toJSON()) as Todo[];
}

export default getTodosByBoard;
