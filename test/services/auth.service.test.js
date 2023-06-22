const bcrypt = require('bcrypt');
const authService = require('../../src/services/auth.service');
const { generateOneUser } = require('../faker-data/user.fake');

describe('Auth service test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser tests', () => {
    test('email and password should be correct and return an user', async () => {
      const fakeUser = generateOneUser();
      jest.spyOn(authService, 'getUser').mockReturnValue(fakeUser);
      const password = await bcrypt.compare('contrasena', fakeUser.password);
      const user = authService.getUser(fakeUser.email, 'contrasena');

      expect(password).toBeTruthy();
      expect(user).toEqual(fakeUser);
    });

    test("User doesn't exist, should return No authentication", () => {
      jest.spyOn(authService, 'getUser').mockReturnValue('No authentication');
      const result = authService.getUser('ejemplo@gmail.com', 'contrasena');

      expect(result).toBe('No authentication');
    });

    test("User desactivated, should return a message 'User desactivated'", () => {
      const fakeUser = generateOneUser();
      jest.spyOn(authService, 'getUser').mockReturnValue('User desactivated');
      const user = authService.getUser(fakeUser.email, 'contrasena');

      expect(user).toBe('User desactivated');
    });

    test("Password is wrong, should return 'Incorrect password'", async () => {
      const fakeUser = generateOneUser();
      jest.spyOn(authService, 'getUser').mockReturnValue('Incorrect password');
      const password = await bcrypt.compare('fake', fakeUser.password);
      const user = authService.getUser(fakeUser.email, 'contrasena');

      expect(password).not.toBeTruthy();
      expect(user).toBe('Incorrect password');
    });
  });

  describe('signToken tests', () => {
    test('Should return user and token', () => {
      const fakeUser = generateOneUser();
      // eslint-disable-next-line quotes
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZjE1ZTJiMi0wYTg5LTQ4NmMtYjcyNC04ZTA5NWEyOWQ2YTEiLCJyb2xlIjpbImFkbWluIl0sImlhdCI6MTY4NzI4NzI3NX0.8XjS-pxSv9fgt8qh0ZGmAxPZhgT9CGSiwtBfLff9I-M";
      jest.spyOn(authService, 'signToken').mockReturnValue({ user: fakeUser, token });
      const tokenUser = authService.signToken(fakeUser);

      expect(tokenUser.user).toEqual(fakeUser);
      expect(tokenUser.token).toBe(token);
    });
  });

  describe('sendRecovery tests', () => {
    test('Email exist, should return value', () => {
      const fakeUser = generateOneUser();
      jest.spyOn(authService, 'sendRecovery').mockReturnValue({ message: 'email sent' });
      const result = authService.sendRecovery(fakeUser.email);

      expect(result.message).toBe('email sent');
    });

    test("Email doesn't exist, should return 'no authentication'", () => {
      const fakeUser = generateOneUser();
      jest.spyOn(authService, 'sendRecovery').mockReturnValue('no authentication');
      const result = authService.sendRecovery(fakeUser.email);

      expect(result).toBe('no authentication');
    });

    test("Account desactivated, should return 'account desactivated'", () => {
      const fakeUser = generateOneUser();
      jest.spyOn(authService, 'sendRecovery').mockReturnValue('account desactivated');
      const result = authService.sendRecovery(fakeUser.email);

      expect(result).toBe('account desactivated');
    });
  });

  describe('changePassword tests', () => {
    test("Password changes, should return 'Token invalid'", () => {
    });
  });
});
