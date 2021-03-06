'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
    let data = [];
    for(let i = 0; i < 50 ; i++){
      data.push({
  
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        graduationYear: faker.random.number({'min': 1970,'max': 2020}),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
   await queryInterface.bulkInsert('alumnis', data, {});
  },

  down: async (queryInterface, Sequelize) => {

  
  }
}