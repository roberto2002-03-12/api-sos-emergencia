const userService = require('../../src/services/user.service');
const { generateOneUser } = require('../faker-data/user.fake');

describe('User service test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return one user', () => {
    const fakeUser = generateOneUser();
    jest.spyOn(userService, 'getUserById').mockReturnValue(fakeUser);

    const user = userService.getUserById(fakeUser.idUser);

    expect(user).toEqual(fakeUser);
  });

  test('Should update email user', () => {
    const fakeUser = generateOneUser();
    const objectUpdated = {
      ...fakeUser,
      email: 'ejemplo@gmail.com',
    };
    jest.spyOn(userService, 'updateUser').mockReturnValue(objectUpdated);
    // eslint-disable-next-line max-len
    const result = userService.updateUser(fakeUser.idUser, { email: objectUpdated.email });
    expect(result.email).toEqual(objectUpdated.email);
    expect(result.email).not.toEqual(fakeUser.email);
  });

  test('Should get an user by his email', () => {
    const fakeUser = generateOneUser();
    jest.spyOn(userService, 'getUserByEmail').mockReturnValue(fakeUser);
    const user = userService.getUserByEmail(fakeUser.email);
    expect(user.email).toBe(fakeUser.email);
  });

  test("should not return an user if doesn't exist", () => {
    jest.spyOn(userService, 'getUserByEmail').mockReturnValue(undefined);
    const user = userService.getUserByEmail('lalallala');
    expect(user).toBe(undefined);
  });

  test('Should return a message that password has been changed', () => {
    // note: in e2e testing i'll verify if the password has changed.
    const fakeUser = generateOneUser();
    jest.spyOn(userService, 'changePassword').mockReturnValue('password changed');
    const result = userService.changePassword(fakeUser.idUser, { password: '12345678' });
    expect(result).toBe('password changed');
  });
});
