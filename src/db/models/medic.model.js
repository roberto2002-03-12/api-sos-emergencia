const { Sequelize, Model, DataTypes } = require('sequelize');
const { SPECIALITY_TABLE } = require('./speciality.model');
const { PROFILE_TABLE } = require('./profile.model');
const { MEDIC_UNIVERSITY_TABLE } = require('./medic_university.model');

const MEDIC_TABLE = 'medic';

const MedicSchema = {
  idMedic: {
    primaryKey: true,
    field: 'id_medic',
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT('medium'),
  },
  certification_code: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  photoUrlCertification: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  photoCertification: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  specialityId: {
    field: 'speciality_id',
    type: DataTypes.UUID,
    references: {
      model: SPECIALITY_TABLE,
      key: 'id_speciality',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  universityId: {
    field: 'university_id',
    type: DataTypes.UUID,
    references: {
      model: MEDIC_UNIVERSITY_TABLE,
      key: 'id_medic_university',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  profileId: {
    field: 'profile_id',
    type: DataTypes.UUID,
    references: {
      model: PROFILE_TABLE,
      key: 'id_profile',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  },
};

class Medic extends Model {
  static associate(model) {
    this.hasMany(model.Certification, {
      as: 'certifications',
      foreignKey: 'medic_id',
    });

    this.belongsTo(model.Speciality, {
      as: 'speciality',
      foreignKey: 'speciality_id',
    });

    this.belongsTo(model.Profile, {
      as: 'profile',
      foreignKey: 'profile_id',
    });

    this.belongsTo(model.MedicUniversity, {
      as: 'university',
      foreignKey: 'university_id',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MEDIC_TABLE,
      modelName: 'Medic',
      timestamps: false,
    };
  }
}

module.exports = {
  MEDIC_TABLE,
  MedicSchema,
  Medic,
};
