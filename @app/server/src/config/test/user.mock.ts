import jwt from 'jsonwebtoken';
import { User } from '../../lib/graphql/__generated__/resolvers-types';

export const user: User = {
  id: 1,
  username: 'testuser',
  firstName: 'Test'
};

export const userToken = jwt.sign(user, process.env.JWT_SECRET!);
