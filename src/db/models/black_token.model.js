/*
  this is used to deny actions from a specific user
*/

const { Sequelize, Model, DataTypes } = require('sequelize');

const BLACK_TOKEN_TABLE = 'black_token';

const BlackTokenSchema = {
  idBlackToken: {
    field: 'id_black_token',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bannedTo: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  addedBy: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class BlackToken extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'BlackToken',
      tableName: BLACK_TOKEN_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  BLACK_TOKEN_TABLE,
  BlackTokenSchema,
  BlackToken,
};
