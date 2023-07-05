const { DataTypes, Model, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { ROLE_TABLE } = require('./role.model');

const USER_ROLE_TABLE = 'user_has_role';

const UserRoleSchema = {
  idUserRole: {
    field: 'id_user_role',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: 'id_user',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userEmail: {
    field: 'user_email',
    type: DataTypes.STRING(85),
    allowNull: false,
  },
  roleId: {
    field: 'role_id',
    type: DataTypes.UUID,
    references: {
      model: ROLE_TABLE,
      key: 'id_rol',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  roleName: {
    field: 'role_name',
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  assignedBy: {
    field: 'assigned_by',
    type: DataTypes.STRING,
    allowNull: false,
  },
  updatedBy: {
    field: 'updated_by',
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

class UserRole extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'UserRole',
      tableName: USER_ROLE_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  USER_ROLE_TABLE,
  UserRoleSchema,
  UserRole,
};
