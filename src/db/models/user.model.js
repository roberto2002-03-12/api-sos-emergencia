const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
  idUser: {
    field: 'id_user',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  loggedToken: {
    field: 'logged_token',
    type: DataTypes.STRING,
    allowNull: false,
  },
  recoveryToken: {
    field: 'recovery_token',
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(model) {
    this.belongsToMany(model.Role, {
      as: 'role',
      through: 'user_has_role',
      foreignKey: 'user_id',
      otherKey: 'role_id',
    });

    this.hasOne(model.Profile, {
      as: 'profile',
      foreignKey: 'user_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'User',
      tableName: USER_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User,
};
