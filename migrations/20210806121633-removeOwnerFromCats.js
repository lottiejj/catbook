'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cats', 'owner')
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Cats', 'owner', {
      type: Sequelize.INTEGER
    })
  }
};
