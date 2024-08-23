import { Board } from '../../../database/models';
import { verifyUser } from '../../../utils';
import { MutationCreateBoardArgs } from '../../__generated__/resolvers-types';

async function createBoard(
  _: unknown,
  args: MutationCreateBoardArgs,
  context: ApolloContext
) {
  const { title } = args;
  const { id } = verifyUser(context);

  const board = await Board.create({ owner: id, title });
  return board.dataValues as Board;
}

export default createBoard;
