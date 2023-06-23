const { Sequelize, Model, DataTypes } = require('sequelize');

const SPECIALITY_TABLE = 'speciality';

const SpecialitySchema = {
  idSpeciality: {
    field: 'id_speciality',
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
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
    defaultValue: Sequelize.NOW,
  },
};

class Speciality extends Model {
  static associate(model) {
    this.hasMany(model.Medic, {
      as: 'medic',
      foreignKey: 'speciality_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Speciality',
      tableName: SPECIALITY_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  SPECIALITY_TABLE,
  SpecialitySchema,
  Speciality,
};
