import { Board } from '../../../database/models';
import { verifyUser } from '../../../utils';
import { MutationDeleteBoardArgs } from '../../__generated__/resolvers-types';

async function deleteBoard(
  _: unknown,
  args: MutationDeleteBoardArgs,
  context: ApolloContext
) {
  const { id } = args;
  const { id: owner } = verifyUser(context);

  const board = await Board.destroy({ where: { id, owner } });

  if (!board) {
    throw new Error('Board not found');
  }
  return true;
}

export default deleteBoard;
