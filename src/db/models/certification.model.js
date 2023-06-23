const { Sequelize, Model, DataTypes } = require('sequelize');
const { MEDIC_TABLE } = require('./medic.model');

const CERTIFICATION_TABLE = 'certification';

const CertificationSchema = {
  idCertification: {
    field: 'id_certification',
    type: DataTypes.UUID,
    defaultValue: Sequelize.NOW,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  certificationCode: {
    field: 'certification_code',
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
  medicId: {
    field: 'medic_id',
    type: DataTypes.UUID,
    references: {
      model: MEDIC_TABLE,
      key: 'id_medic',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    field: 'created_at',
    allowNull: true,
    type: DataTypes.DATE,
  },
};

class Certification extends Model {
  static associate(model) {
    this.belongsTo(model.Medic, {
      as: 'medic',
      foreignKey: 'medic_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Certification',
      tableName: CERTIFICATION_TABLE,
      timestamps: false,
    };
  }
}

module.exports = {
  CERTIFICATION_TABLE,
  CertificationSchema,
  Certification,
};
