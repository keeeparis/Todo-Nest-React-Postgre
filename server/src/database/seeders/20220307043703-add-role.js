'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [{
      value: 'USER',
      description: 'Пользователь',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    await queryInterface.bulkInsert('roles', [{
      value: 'ADMIN',
      description: 'Администратор',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('roles', null, {});
  }
};
