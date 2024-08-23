import { User } from '../../../database/models';
import { generateToken, checkPassword } from '../../../utils';
import {
  User as ReturnedUser,
  QueryUserLoginArgs
} from '../../__generated__/resolvers-types';

async function userLogin(
  _: unknown,
  args: QueryUserLoginArgs
): Promise<ReturnedUser> {
  const { username, password } = args;
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('User not found');

  const parsedUser = user.toJSON() as User;
  const passwordValid = checkPassword(password, parsedUser.password);

  if (!passwordValid) throw new Error('Invalid password');

  const token = generateToken(parsedUser);
  return { ...parsedUser, token };
}

export default userLogin;
