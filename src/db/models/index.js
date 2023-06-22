const { UserSchema, User } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { UserRole, UserRoleSchema } = require('./user_role.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { BlackToken, BlackTokenSchema } = require('./black_token.model');
// const { Code, CodeSchema } = require('./code.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  UserRole.init(UserRoleSchema, UserRole.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
  BlackToken.init(BlackTokenSchema, BlackToken.config(sequelize));
  // Code.init(CodeSchema, Code.config(sequelize));

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Profile.associate(sequelize.models);
}

module.exports = setUpModels;
