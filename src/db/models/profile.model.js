const { Sequelize, Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const PROFILE_TABLE = 'profile';

const ProfileSchema = {
  idProfile: {
    field: 'id_profile',
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    type: DataTypes.UUID,
    primaryKey: true,
  },
  firstName: {
    allowNull: false,
    field: 'first_name',
    type: DataTypes.STRING(65),
  },
  lastName: {
    allowNull: false,
    field: 'last_name',
    type: DataTypes.STRING(65),
  },
  // this can be Identification Number
  // in Peru we call it "DNI"
  dni: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(8),
  },
  phoneNumber: {
    field: 'phone_number',
    type: DataTypes.STRING(12),
    allowNull: false,
  },
  photoName: {
    field: 'photo_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  photoUrl: {
    field: 'photo_url',
    allowNull: false,
    type: DataTypes.STRING,
  },
  birthDate: {
    field: 'birth_date',
    allowNull: false,
    type: DataTypes.DATEONLY,
  },
  sex: {
    allowNull: false,
    type: DataTypes.STRING(15),
  },
  address: {
    allowNull: false,
    type: DataTypes.STRING(85),
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: 'id_user',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
};

class Profile extends Model {
  static associate(model) {
    this.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Profile',
      tableName: PROFILE_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  PROFILE_TABLE,
  ProfileSchema,
  Profile,
};
