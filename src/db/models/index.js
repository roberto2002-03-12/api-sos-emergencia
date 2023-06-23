const { UserSchema, User } = require('./user.model');
const { Role, RoleSchema } = require('./role.model');
const { UserRole, UserRoleSchema } = require('./user_role.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { BlackToken, BlackTokenSchema } = require('./black_token.model');
const { Medic, MedicSchema } = require('./medic.model');
const { MedicUniversity, MedicUniversitySchema } = require('./medic_university.model');
const { Speciality, SpecialitySchema } = require('./speciality.model');
const { Certification, CertificationSchema } = require('./certification.model');
// const { Code, CodeSchema } = require('./code.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  UserRole.init(UserRoleSchema, UserRole.config(sequelize));
  Profile.init(ProfileSchema, Profile.config(sequelize));
  BlackToken.init(BlackTokenSchema, BlackToken.config(sequelize));
  Speciality.init(SpecialitySchema, Speciality.config(sequelize));
  MedicUniversity.init(MedicUniversitySchema, MedicUniversity.config(sequelize));
  Medic.init(MedicSchema, Medic.config(sequelize));
  Certification.init(CertificationSchema, Certification.config(sequelize));
  // Code.init(CodeSchema, Code.config(sequelize));

  User.associate(sequelize.models);
  Role.associate(sequelize.models);
  Profile.associate(sequelize.models);
  Speciality.associate(sequelize.models);
  MedicUniversity.associate(sequelize.models);
  Medic.associate(sequelize.models);
  Certification.associate(sequelize.models);
}

module.exports = setUpModels;
