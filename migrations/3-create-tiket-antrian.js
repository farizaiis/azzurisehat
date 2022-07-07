'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tiketantrians', {
      NoTiket: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      TglBuatTiket: {
        type: Sequelize.DATE
      },
      StatusTiket: {
        type: Sequelize.STRING
      },
      StatusCetak: {
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
    await queryInterface.dropTable('tiketantrians');
  }
};