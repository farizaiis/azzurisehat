'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subbags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      subbags.hasMany(models.tikettamus, {as: 'tikettamus', foreignKey: 'KdSubBag'})
      subbags.belongsTo(models.bagians, {foreignKey: 'KodeBagian'})
    }
  }
  subbags.init({
    KodeBagian: DataTypes.STRING,
    KdSubBag: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    Jabatan: DataTypes.STRING,
    Keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'subbags',
  });
  return subbags;
};