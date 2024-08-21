import { hashPassword } from '../password';

describe('password utils: ', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'password';
      const hashedPassword = hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
    });
  });
});
