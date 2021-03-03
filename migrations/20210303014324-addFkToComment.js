'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
       await queryInterface.addConstraint('comments', {
      type: 'FOREIGN KEY',
      fields:['thread_id'],
      references: {
        table: 'threads',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', 
    });
    
  await queryInterface.addConstraint('comments', {
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
