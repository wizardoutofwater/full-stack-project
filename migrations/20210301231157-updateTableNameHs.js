'use strict';

module.exports = {
 
    up: async (queryInterface, Sequelize) => {
      queryInterface.renameTable('HighSchools', 'highschools')
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
