import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { User } from '../graphql/__generated__/resolvers-types';

export function generateToken(user: User) {
  return jwt.sign(user, process.env.JWT_SECRET!);
}

export const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

export function verifyUser(context: ApolloContext) {
  const { guest } = context;
  let { token } = context;

  if (!token && !guest) {
    throw new GraphQLError('No authentication was sent with the request', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }
  if (guest) {
    return { id: guest };
  }

  token = token!.replace('Bearer ', '');
  const user = decodeToken(token) as User;
  return user;
}
