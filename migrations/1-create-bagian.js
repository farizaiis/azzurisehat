'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bagians', {
      KodeBagian: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      NamaBagian: {
        type: Sequelize.STRING
      },
      Keterangan: {
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
    await queryInterface.dropTable('bagians');
  }
};