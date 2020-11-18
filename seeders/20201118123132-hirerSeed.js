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
    let data = require('../seedDatas/hirers.json');
    for(let i = 0; i < data.length; i++){
      data[i].createdAt = new Date();
      data[i].updatedAt = new Date();
    }
    return queryInterface.bulkInsert('Hirers', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Hirers', null, {});
  }
};
