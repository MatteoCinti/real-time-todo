import { Board } from '../../../database/models';
import { verifyUser } from '../../../utils';

async function getUserBoards(_: unknown, __: unknown, context: ApolloContext) {
  const { id } = verifyUser(context);
  const boards = await Board.findAll({ where: { owner: id } });
  return boards.map((board) => board.toJSON()) as Board[];
}

export default getUserBoards;
