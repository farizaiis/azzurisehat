'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subbags', [
        {
          KodeBagian: 'D01',
          KdSubBag: 'D01-01',
          Jabatan: 'Head',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          KodeBagian: 'D01',
          KdSubBag: 'D01-02',
          Jabatan: 'Manager',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          KodeBagian: 'F01',
          KdSubBag: 'F01-05',
          Jabatan: 'Staff',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          KodeBagian: 'G03',
          KdSubBag: 'G03-08',
          Jabatan: 'Sales',
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
