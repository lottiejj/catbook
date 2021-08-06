'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cats', 'OwnerId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Owners'
        },
        key: 'id'
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cats', 'OwnerId')
  }
};
