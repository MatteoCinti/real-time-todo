import { GraphQLError } from 'graphql';

import { User } from '../../../database/models';
import { decodeToken } from '../../../utils';

async function getUser(
  _: unknown,
  __: unknown,
  context: ApolloContext
): Promise<User> {
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

  const user = await User.findOne({ where: { id } });
  return user!.toJSON() as User;
}

export default getUser;
