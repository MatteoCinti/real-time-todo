import { Board } from '../../../database/models';
import { verifyUser } from '../../../utils';
import { QueryGetBoardArgs } from '../../__generated__/resolvers-types';

async function getBoard(
  _: unknown,
  args: QueryGetBoardArgs,
  context: ApolloContext
) {
  const { id } = args;
  const { id: owner } = verifyUser(context);
  const board = await Board.findOne({ where: { owner, id } });

  return board!.toJSON() as Board;
}
export default getBoard;
