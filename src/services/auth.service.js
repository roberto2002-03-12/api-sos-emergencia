const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// const getRoles = require('../helpers/getRoles');
const { getUserById, getUserByEmail, updateUser } = require('./user.service');
const { config } = require('../config/config');
const { models } = require('../libs/sequelize');

const getUser = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) throw boom.unauthorized('No authentication');

  if (user.dataValues.activated === 0) throw boom.unauthorized('User desactivated');

  const comprobar = await bcrypt.compare(password, user.dataValues.password);

  if (!comprobar) throw boom.unauthorized('Incorrect password');

  delete user.dataValues.password;

  return user;
};

const signToken = async (user) => {
  const role = [];

  for (let i = 0; i < user?.role.length; i += 1) {
    role.push(user?.role[i]?.dataValues.roleName);
  }

  const payload = {
    sub: user.dataValues.idUser,
    role,
  };
  // add expire time if you need it, in my case i shouldn't add it
  // but it depends what case scenario you're dealing
  const token = jwt.sign(payload, config.jwtSecret);

  const userFound = await models.User.findByPk(user.dataValues.idUser);

  await userFound.update({ loggedToken: token });

  return {
    user,
    token,
  };
};

const sendMail = async (infoMail) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: config.emailRecype,
      pass: config.passRecype,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  await transport.sendMail(infoMail);

  return { message: 'email sent' };
};

const sendRecovery = async (email) => {
  const user = await getUserByEmail(email);

  if (!user) throw boom.unauthorized('no authentication');

  if (user.dataValues.activated === 0) throw boom.unauthorized('account desactivated');

  const payload = {
    sub: user.dataValues.idUser,
  };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });

  const recovery = {
    recoveryToken: token,
  };

  await updateUser(user.dataValues.idUser, recovery);

  const emailInfo = {
    from: config.emailRecype,
    to: `${user.dataValues.email}`,
    subject: 'Email to recovery your password',
    text: `Use this token to change your password: ${token}`,
  };

  const result = await sendMail(emailInfo);

  return result;
};

const changePassword = async (token, newPassword) => {
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await getUserById(payload.sub);

    if (user.dataValues.recoveryToken !== token) throw boom.unauthorized('Token invalid');

    const hash = await bcrypt.hash(newPassword, 10);

    await updateUser(user.dataValues.idUser, {
      recoveryToken: null,
      password: hash,
    });

    return { message: 'Password changed' };
  } catch (err) {
    // the token which is used can be expired
    throw boom.unauthorized('Token expired');
  }
};

// you can use this to renew tokens, in my case I won't use it so i'll just comment it
// const renewToken = async (sub) => {
//   const user = await getUserById(sub);
//   const roles = getRoles(user.dataValues.role);

//   const payload = {
//     sub,
//     role: roles,
//   };
//   // add expire time
//   const token = jwt.sign(payload, config.jwtSecret);

//   user.update({
//     loggedToken: token,
//   });

//   delete user.dataValues.password;

//   return {
//     user,
//     token,
//   };
// };

module.exports = {
  getUser,
  signToken,
  sendRecovery,
  changePassword,
};
