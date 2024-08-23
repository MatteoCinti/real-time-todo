import { GraphQLError } from 'graphql';
import { Board, User } from '../../../database/models';
import { decodeToken } from '../../../utils';

async function getUserBoards(_: unknown, __: unknown, context: ApolloContext) {
  let { token } = context;

  if (!token) {
    throw new GraphQLError('No authentication was sent with the request', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }
  token = token.replace('Bearer ', '');
  const { id } = decodeToken(token) as User;

  const boards = await Board.findAll({ where: { owner: id } });

  return boards.map((board) => board.toJSON()) as Board[];
}

export default getUserBoards;
