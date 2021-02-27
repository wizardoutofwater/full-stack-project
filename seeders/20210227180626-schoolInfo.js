'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let data = [];
    for(let i = 0; i < 50 ; i++){
      data.push({
  
        name: faker.company.companyName(),
        city: faker.address.city(),
        state: faker.address.state(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    
      await queryInterface.bulkInsert('HighSchools', data , 
      {});

  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkDelete('HighSchools', data, {});
     
  }
};
