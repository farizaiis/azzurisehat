'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subbags', {
      KodeBagian: {
        type: Sequelize.STRING,
        references: {
          model: 'bagians',
          key: 'KodeBagian'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      KdSubBag: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Jabatan: {
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
    await queryInterface.dropTable('subbags');
  }
};