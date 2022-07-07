'use strict';
const moment = require('moment')

const date = new Date()
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tikettamus', [
        {
          NoTiket: 'D01-01-001-08-07-22',
          NoIdentitas: '3674020101960002',
          KodeBagian: 'D01',
          KdSubBag: 'D01-01',
          KeperluanBertamu: 'Iseng aja ngobrol',
          TglMintaBertamu: moment(date.addDays(3)).format('DD/MM/YYYY'),
          MintaJamBertamu: '13:00',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoTiket: 'D01-02--003-10-07-22',
          NoIdentitas: '3674020101960001',
          KodeBagian: 'D01',
          KdSubBag: 'D01-02',
          KeperluanBertamu: 'Pembayaran jasa vendor',
          TglMintaBertamu: moment(date.addDays(3)).format('DD/MM/YYYY'),
          MintaJamBertamu: '14:00',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoTiket: 'F01-05-012-10-07-22',
          NoIdentitas: '3674090101960002',
          KodeBagian: 'F01',
          KdSubBag: 'F01-05',
          KeperluanBertamu: 'Nagih hutang',
          TglMintaBertamu: moment(date.addDays(3)).format('DD/MM/YYYY'),
          MintaJamBertamu: '12:50',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoTiket: 'G03-08-009-10-07-22',
          NoIdentitas: '3674080101960001',
          KodeBagian: 'G03',
          KdSubBag: 'G03-08',
          KeperluanBertamu: 'Pengajuan proposal',
          TglMintaBertamu: moment(date.addDays(3)).format('DD/MM/YYYY'),
          MintaJamBertamu: '16:00',
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
