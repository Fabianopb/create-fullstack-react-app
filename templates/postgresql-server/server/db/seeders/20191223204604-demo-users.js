'use strict';
const date = new Date();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            name: 'John Doe',
            age: 30,
            createdAt: date,
            updatedAt: date,
          },
          {
            name: 'Fred Johnson',
            age: 40,
            createdAt: date,
            updatedAt: date,
          },
        ],
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('Users', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
