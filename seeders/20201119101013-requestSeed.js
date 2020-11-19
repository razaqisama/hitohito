'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = require('../seedDatas/requests.json')
    for(let i = 0; i < data.length; i++){
      data[i].createdAt = new Date();
      data[i].updatedAt = new Date();
    }
    return queryInterface.bulkInsert('Requests', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Requests', null, {});
  }
};
