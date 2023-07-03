const { Sequelize, Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const NOTIFICATION_TABLE = 'notification';

const NotificationSchema = {
  idNotification: {
    field: 'id_notification',
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT('medium'),
    allowNull: false,
  },
  userId: {
    field: 'user_id',
    type: DataTypes.UUID,
    references: {
      model: USER_TABLE,
      key: 'id_user',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
};

class Notification extends Model {
  static associate(model) {
    this.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: NOTIFICATION_TABLE,
      modelName: 'Notification',
      timestamps: false,
    };
  }
}

module.exports = {
  NOTIFICATION_TABLE,
  NotificationSchema,
  Notification,
};
