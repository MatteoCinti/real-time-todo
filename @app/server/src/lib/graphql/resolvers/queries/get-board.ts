import { Board } from '../../../database/models';
import { QueryGetBoardArgs } from '../../__generated__/resolvers-types';

async function getBoard(_: unknown, args: QueryGetBoardArgs) {
  const { owner, id } = args;
  const board = await Board.findOne({ where: { owner, id } });

  return board!.toJSON() as Board;
}
export default getBoard;
