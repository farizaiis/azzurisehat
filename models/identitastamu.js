'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class identitastamus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      identitastamus.hasMany(models.tikettamus, {as: 'tikettamus', foreignKey: 'NoIdentitas'})
    }
  }
  identitastamus.init({
    NoIdentitas: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false
    },
    Nama: DataTypes.STRING,
    TempatLahir: DataTypes.STRING,
    TglLahir: DataTypes.DATEONLY,
    JenisKelamin: DataTypes.STRING,
    Alamat: DataTypes.STRING,
    NoHandphone: DataTypes.STRING,
    TlpRmh: DataTypes.STRING,
    Email: DataTypes.STRING,
    KdPropinsi: DataTypes.STRING,
    KdKotaKabupaten: DataTypes.STRING,
    KdKecamatan: DataTypes.STRING,
    KdKelurahan: DataTypes.STRING,
    Kodepos: DataTypes.STRING,
    KdJenisId: DataTypes.STRING,
    PhotoDiriKtp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'identitastamus',
  });
  return identitastamus;
};