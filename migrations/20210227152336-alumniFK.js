'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Alumnis', {
      type: 'FOREIGN KEY',
      fields:['HighSchool_id'],
      references: {
        table: 'HighSchools',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    });
    
    
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
