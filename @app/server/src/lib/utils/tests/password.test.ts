import { checkPassword, hashPassword } from '../password';

describe('password utils: ', () => {
  const password = 'password';
  const hashed =
    '8c9a239e21f7bb939f8b570ae81daa50028d6a3d3250111e2d4cd269c2ab54bb';

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const hashedPassword = hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword).toBe(hashed);
    });
  });
  describe('checkPassword', () => {
    it('should return true if a password is correct', async () => {
      const isPassword = checkPassword(password, hashed);
      expect(isPassword).toBe(true);
    });
    it('should return false if a password is incorrect', async () => {
      const isPassword = checkPassword('wrongPassword', hashed);
      expect(isPassword).toBe(false);
    });
  });
});
