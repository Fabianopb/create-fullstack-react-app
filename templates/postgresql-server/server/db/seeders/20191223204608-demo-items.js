import db from '../../models';

const date = new Date();

const seed = {
  up: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const users = await db.User.findAll({ raw: true });
      await queryInterface.bulkInsert(
        'Items',
        [
          {
            name: 'Red Ferrari',
            createdAt: date,
            updatedAt: date,
            UserId: users[0].id,
          },
          {
            name: 'White Yacht',
            createdAt: date,
            updatedAt: date,
            UserId: users[1].id,
          },
          {
            name: 'Blue Mansion',
            createdAt: date,
            updatedAt: date,
            UserId: users[0].id,
          },
          {
            name: 'Yellow Submarine',
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

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('Items', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

export default seed;
