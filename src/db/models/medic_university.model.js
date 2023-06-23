const { Sequelize, Model, DataTypes } = require('sequelize');

const MEDIC_UNIVERSITY_TABLE = 'medic_university';

const MedicUniversitySchema = {
  idMedicUniversity: {
    field: 'id_medic_university',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class MedicUniversity extends Model {
  static associate(model) {
    this.hasMany(model.Medic, {
      as: 'medic',
      foreignKey: 'university_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MEDIC_UNIVERSITY_TABLE,
      modelName: 'MedicUniversity',
      timestamps: false,
    };
  }
}

module.exports = {
  MEDIC_UNIVERSITY_TABLE,
  MedicUniversitySchema,
  MedicUniversity,
};
