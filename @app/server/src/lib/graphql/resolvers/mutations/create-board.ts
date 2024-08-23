import { Board } from '../../../database/models';
import { MutationCreateBoardArgs } from '../../__generated__/resolvers-types';

async function createBoard(_: unknown, args: MutationCreateBoardArgs) {
  const { owner, title } = args;
  const board = await Board.create({ owner, title });

  return board.dataValues as Board;
}

export default createBoard;
