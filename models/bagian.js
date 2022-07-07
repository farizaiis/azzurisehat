'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bagians extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bagians.hasMany(models.subbags, {as: 'subbags', foreignKey: 'KodeBagian'})
      bagians.hasMany(models.tikettamus, {as: 'tikettamus', foreignKey: 'KodeBagian'})
    }
  }
  bagians.init({
    KodeBagian: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    NamaBagian: DataTypes.STRING,
    Keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bagians',
  });
  return bagians;
};