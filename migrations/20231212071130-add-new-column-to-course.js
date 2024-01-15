"use strict";

const { LEVEL } = require('../src/constant/level');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.addColumn("courses", "image", {
          type: Sequelize.STRING
        },{transaction:t});
        await queryInterface.addColumn("courses", "estimatedTime", {
          type: Sequelize.STRING
        },{transaction:t});
        await queryInterface.addColumn("courses", "difficulty", {
          type: Sequelize.ENUM(LEVEL.EASY,LEVEL.MEDIUM,LEVEL.DIFFICULT)
        },{transaction:t});
      })
     } catch (err) {
       throw err;
     }
   
  },

  down: async (queryInterface) => {
    try{
    await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.removeColumn("courses", "image",{transaction:t});
    await queryInterface.removeColumn("courses", "estimatedTime",{transaction:t});
    await queryInterface.removeColumn("courses", "difficulty",{transaction:t});
  })
}  catch (err) {
  throw err;
  }
}
}
