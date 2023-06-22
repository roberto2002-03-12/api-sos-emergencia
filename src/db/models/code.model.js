/*
  This model is used to create a code which it should be used to register.
  In other words, if you want to let someone to register, then generate one code
  and then give it to him/her. Once the code is used you won't be aviable to use it
  again.

  if you don't want this feature, just ignore this or assuming you choosed the complete
  user managament api, then go to services and delete all relations this model has.
*/

const { Sequelize, Model, DataTypes } = require('sequelize');

const CODE_TABLE = 'code';

const CodeSchema = {
  idCode: {
    field: 'id_code',
    allowNull: false,
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  code: {
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
  },
  createdBy: {
    field: 'created_by',
    allowNull: false,
    type: DataTypes.STRING(65),
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  usedBy: {
    field: 'used_by',
    allowNull: false,
    type: DataTypes.STRING(65),
  },
  usedAt: {
    field: 'used_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
};

class Code extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: CODE_TABLE,
      modelName: 'Code',
      timestamps: false,
    };
  }
}

module.exports = {
  CODE_TABLE,
  CodeSchema,
  Code,
};
