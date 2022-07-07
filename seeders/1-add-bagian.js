'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      
    await queryInterface.bulkInsert('bagians', [
        {
          KodeBagian: 'D01',
          NamaBagian: 'Finance',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          KodeBagian: 'E02',
          NamaBagian: 'Techno',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          KodeBagian: 'F01',
          NamaBagian: 'Human Resource',
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          KodeBagian: 'G03',
          NamaBagian: 'Marketing',
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
