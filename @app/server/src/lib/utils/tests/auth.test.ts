import jwt from 'jsonwebtoken';
import { user, JWT_SECRET } from '../../../config/test';
import { generateToken } from '../auth';

describe('auth', () => {
  const ORIG_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...ORIG_ENV, JWT_SECRET };
  });

  afterEach(() => {
    process.env = ORIG_ENV;
  });

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
});
