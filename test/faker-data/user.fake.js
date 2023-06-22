const { faker } = require('@faker-js/faker');

const generateOneSpecificUser = () => ({
  idUser: 'bf2aa445-e518-45b2-b408-5495c9663929',
  email: 'emilio.contreras@tecsup.edu.pe',
  password: '$2a$10$ASjgGqlcqMPsr1XUXumaT.fCNf14unUK0xRTzywLFvdchNyf7pAUO',
  activated: true,
  createdAt: '2023-06-14T16:30:47.000Z',
  updatedAt: '2023-06-14T16:30:47.000Z',
  role: [
    {
      roleName: 'admin',
      description: faker.lorem.paragraph({ max: 1 }),
    },
  ],
  profile: {
    idProfile: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dni: faker.number.int({ max: 99999999 }),
    phoneNumber: faker.phone.number('+51-###-###-###'),
    photoName: faker.image.url(),
    photoUrl: faker.image.url(),
    birthDate: faker.date.birthdate(),
    sex: faker.person.sex(),
    address: faker.location.streetAddress(),
  },
});

const generateOneUser = () => ({
  idUser: faker.string.uuid(),
  email: faker.internet.email(),
  password: '$2a$10$ASjgGqlcqMPsr1XUXumaT.fCNf14unUK0xRTzywLFvdchNyf7pAUO',
  activated: true,
  createdAt: '2023-06-14T16:30:47.000Z',
  updatedAt: '2023-06-14T16:30:47.000Z',
  role: [
    {
      roleName: 'admin',
      description: faker.lorem.paragraph({ max: 1 }),
    },
  ],
  profile: {
    idProfile: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dni: faker.number.int({ max: 99999999 }),
    phoneNumber: faker.phone.number('+51-###-###-###'),
    photoName: faker.image.url(),
    photoUrl: faker.image.url(),
    birthDate: faker.date.birthdate(),
    sex: faker.person.sex(),
    address: faker.location.streetAddress(),
  },
});

const generateManyUser = (size) => {
  const limit = size ?? 10;
  const fakeUsers = [];
  for (let index = 0; index < limit; index += 1) {
    fakeUsers.push(generateOneUser());
  }
  return [...fakeUsers];
};

module.exports = {
  generateOneUser,
  generateManyUser,
  generateOneSpecificUser,
};
