import { GraphQLError } from 'graphql';
import { User } from '../../../database/models';
import { MutationCreateUserArgs } from '../../__generated__/resolvers-types';
import { generateToken, hashPassword } from '../../../utils';

async function createUser(_: unknown, args: MutationCreateUserArgs) {
  const { username, password, firstName } = args;
  const hashedPassword = hashPassword(password);

  const user = await User.create({
    username,
    firstName,
    password: hashedPassword
  });

  const userJson = user.toJSON() as User;

  if (!userJson.id) {
    throw new GraphQLError('Error creating user');
  }

  const { password: __, ...userWithoutPassword } = userJson;
  const token = generateToken(userWithoutPassword);

  return { ...userWithoutPassword, token };
}

export default createUser;
