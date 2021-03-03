'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('threads', {
      type: 'FOREIGN KEY',
      fields:['highschool_id'],
      references: {
        table: 'highschools',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    });
    
  await queryInterface.addConstraint('threads', {
      type: 'FOREIGN KEY',
      fields:['user_id'],
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    });
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
