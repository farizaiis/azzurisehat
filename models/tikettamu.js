'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tikettamus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tikettamus.belongsTo(models.bagians, {foreignKey: 'KodeBagian'})
      tikettamus.belongsTo(models.subbags, {foreignKey: 'KdSubBag'})
      tikettamus.belongsTo(models.identitastamus, {foreignKey: 'NoIdentitas'})
    }
  }
  tikettamus.init({
    NoTiket: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    NoIdentitas: DataTypes.STRING,
    KodeBagian: DataTypes.STRING,
    KdSubBag: DataTypes.STRING,
    KeperluanBertamu: DataTypes.STRING,
    TglMintaBertamu: DataTypes.DATEONLY,
    MintaJamBertamu: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'tikettamus',
  });
  return tikettamus;
};