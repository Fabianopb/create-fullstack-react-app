const migration = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Items', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    }),

  down: (queryInterface) => queryInterface.removeColumn('Items', 'UserId'),
};

export default migration;
