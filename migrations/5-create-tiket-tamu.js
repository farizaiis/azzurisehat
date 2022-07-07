'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tikettamus', {
      NoTiket: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      NoIdentitas: {
        type: Sequelize.STRING,
        references: {
          model: 'identitastamus',
          key: 'NoIdentitas'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
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
        references: {
          model: 'subbags',
          key: 'KdSubBag'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      KeperluanBertamu: {
        type: Sequelize.STRING
      },
      TglMintaBertamu: {
        type: Sequelize.DATE
      },
      MintaJamBertamu: {
        type: Sequelize.TIME
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
    await queryInterface.dropTable('tikettamus');
  }
};