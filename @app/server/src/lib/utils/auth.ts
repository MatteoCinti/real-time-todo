import jwt from 'jsonwebtoken';
import { User } from '../graphql/__generated__/resolvers-types';

export function generateToken(user: User) {
  return jwt.sign(user, process.env.JWT_SECRET!);
}
