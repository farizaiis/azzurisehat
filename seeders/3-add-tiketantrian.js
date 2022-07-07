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
    await queryInterface.bulkInsert('tiketantrians', [
        {
          NoTiket: 'D01-01-08-07-22',
          TglBuatTiket: moment(date).format('DD/MM/YYYY hh:mm:ss'),
          StatusTiket: 'Kadaluarsa',
          StatusCetak : 'True',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoTiket: 'D01-02-10-07-22',
          TglBuatTiket: moment(date.addDays(1)).format('DD/MM/YYYY hh:mm:ss'),
          StatusTiket: 'Berlaku',
          StatusCetak : 'True',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoTiket: 'F01-05-10-07-22',
          TglBuatTiket: moment(date.addDays(2)).format('DD/MM/YYYY hh:mm:ss'),
          StatusTiket: 'Berlaku',
          StatusCetak : 'False',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          NoTiket: 'G03-08-10-07-22',
          TglBuatTiket: moment(date).format('DD/MM/YYYY hh:mm:ss'),
          StatusTiket: 'Berlaku',
          StatusCetak : 'True',
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
