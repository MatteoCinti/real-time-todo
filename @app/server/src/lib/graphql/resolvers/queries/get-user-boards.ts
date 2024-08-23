import { QueryGetUserBoardsArgs } from '../../__generated__/resolvers-types';
import { Board } from '../../../database/models';

async function getUserBoards(_: unknown, args: QueryGetUserBoardsArgs) {
  const { owner } = args;
  const boards = await Board.findAll({ where: { owner } });

  return boards.map((board) => board.toJSON()) as Board[];
}

export default getUserBoards;
