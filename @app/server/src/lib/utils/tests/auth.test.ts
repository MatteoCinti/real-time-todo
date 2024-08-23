import jwt from 'jsonwebtoken';
import { user } from '../../../config/test';
import { generateToken, verifyUser } from '../auth';

describe('auth', () => {
  describe('generateToken', () => {
    it('should generate a token', () => {
      const token = generateToken(user);
      expect(token).toBeDefined();
    });
    it('token should be valid', () => {
      const token = generateToken(user);

      // Decode the token without verification to check the structure
      const decoded = jwt.decode(token);
      expect(decoded).not.toBeNull(); // Check that the token was decoded successfully

      // Now verify the token to check that it was signed correctly
      const verified = jwt.verify(token, process.env.JWT_SECRET!);
      expect(verified).toBeTruthy(); // Ensure the token is valid

      expect((verified as jwt.JwtPayload).username).toBe(user.username);
      expect((verified as jwt.JwtPayload).id).toBe(user.id);
    });
  });

  describe('decodeToken', () => {
    it('should verify a token', () => {
      const token = generateToken(user);
      const verified = jwt.verify(token, process.env.JWT_SECRET!);
      expect(verified).toBeTruthy();
      expect((verified as jwt.JwtPayload).username).toBe(user.username);
      expect((verified as jwt.JwtPayload).id).toBe(user.id);
    });
  });

  describe('verifyUser', () => {
    it('should throw an error if no token is provided', () => {
      const context = { token: undefined };
      expect(() => verifyUser(context)).toThrowErrorMatchingSnapshot();
    });

    it('should throw an error if the token is invalid', () => {
      const context = { token: 'invalid' };
      expect(() => verifyUser(context)).toThrowErrorMatchingSnapshot();
    });

    it('should return the user if the token is valid', () => {
      const token = generateToken(user);
      const context = { token };
      const result = verifyUser(context);

      expect(result.firstName).toEqual(user.firstName);
      expect(result.username).toEqual(user.username);
      expect(result.id).toEqual(user.id);
    });
  });
});
