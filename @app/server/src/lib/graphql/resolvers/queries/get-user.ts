import { User } from '../../../database/models';
import { verifyUser } from '../../../utils';

async function getUser(
  _: unknown,
  __: unknown,
  context: ApolloContext
): Promise<User> {
  const { id } = verifyUser(context);
  const user = await User.findOne({ where: { id } });
  return user!.toJSON() as User;
}

export default getUser;
