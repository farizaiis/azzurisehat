'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('identitastamus', {
      NoIdentitas: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Nama: {
        type: Sequelize.STRING
      },
      TempatLahir: {
        type: Sequelize.STRING
      },
      TglLahir: {
        type: Sequelize.DATE
      },
      JenisKelamin: {
        type: Sequelize.STRING
      },
      Alamat: {
        type: Sequelize.STRING
      },
      NoHandphone: {
        type: Sequelize.STRING
      },
      TlpRmh: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      KdPropinsi: {
        type: Sequelize.STRING
      },
      KdKotaKabupaten: {
        type: Sequelize.STRING
      },
      KdKecamatan: {
        type: Sequelize.STRING
      },
      KdKelurahan: {
        type: Sequelize.STRING
      },
      Kodepos: {
        type: Sequelize.STRING
      },
      KdJenisId: {
        type: Sequelize.STRING
      },
      PhotoDiriKtp: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('identitastamus');
  }
};