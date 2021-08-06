'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments', 'OwnerId', {
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
    await queryInterface.removeColumn('Comments', 'OwnerId')
  }
};
