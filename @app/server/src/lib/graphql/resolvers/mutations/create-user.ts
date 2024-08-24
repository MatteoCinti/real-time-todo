import { User } from '../../../database/models';
import { MutationCreateUserArgs } from '../../__generated__/resolvers-types';
import { hashPassword } from '../../../utils';

async function createUser(_: unknown, args: MutationCreateUserArgs) {
  const { username, password, firstName } = args;
  const hashedPassword = hashPassword(password);

  const user = await User.create({
    username,
    firstName,
    password: hashedPassword
  });

  return user.toJSON() as User;
}

export default createUser;
