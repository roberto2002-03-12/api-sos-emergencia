const { Sequelize, Model, DataTypes } = require('sequelize');

const ROLE_TABLE = 'rol';

const RoleSchema = {
  idRol: {
    field: 'id_rol',
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  roleName: {
    field: 'role_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('medium'),
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
  /*
    you should add "createdBy" in case
    you want to create roles with credentials
  */
};

class Role extends Model {
  static associate(model) {
    this.belongsToMany(model.User, {
      as: 'user',
      foreignKey: 'role_id',
      otherKey: 'user_id',
      through: 'user_has_role',
    });
  }

  static config(sequelize) {
    return {
      modelName: 'Role',
      tableName: ROLE_TABLE,
      sequelize,
      timestamps: true,
    };
  }
}

module.exports = {
  ROLE_TABLE,
  RoleSchema,
  Role,
};
