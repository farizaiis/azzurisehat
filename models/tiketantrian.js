'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tiketantrians extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  tiketantrians.init({
    NoTiket: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    TglBuatTiket: DataTypes.DATE,
    StatusTiket: DataTypes.STRING,
    StatusCetak: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tiketantrians',
  });
  return tiketantrians;
};