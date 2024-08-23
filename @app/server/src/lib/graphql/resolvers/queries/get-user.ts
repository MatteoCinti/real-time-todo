import { User } from '../../../database/models';
import { QueryGetUserArgs } from '../../__generated__/resolvers-types';

async function getUser(
  _: unknown,
  args: QueryGetUserArgs,
  context: ApolloContext
): Promise<User> {
  const { id } = args;
  // eslint-disable-next-line no-console
  console.log('🚀 ~ getUser: ~ context:', context);
  const user = await User.findOne({ where: { id } });
  return user!.toJSON() as User;
}

export default getUser;
