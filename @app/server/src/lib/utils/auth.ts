import jwt from 'jsonwebtoken';
import { User } from '../graphql/__generated__/resolvers-types';

export function generateToken(user: User) {
  return jwt.sign(user, process.env.JWT_SECRET!);
}

export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('🚀 ~ decodeToken ~ error:', error);
    return false;
  }
};
