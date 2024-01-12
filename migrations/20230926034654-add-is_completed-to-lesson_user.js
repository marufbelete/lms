"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.sequelize.transaction(async (t) => {
        await queryInterface.addColumn("course_users", "is_started", {
          type: Sequelize.BOOLEAN,
          defaultValue:false
        },{transaction:t});
        await queryInterface.addColumn("course_users", "is_completed", {
          type: Sequelize.BOOLEAN,
          defaultValue:false
        },{transaction:t});
        await queryInterface.addColumn("courses", "collectionId", {
          type: Sequelize.UUID,
          references: {
            model: "collections",
            key: "id",
          },
          onDelete: "CASCADE",
        },{transaction:t});
      })
     } catch (err) {
       throw err;
     }
   
  },

  down: async (queryInterface) => {
    try{
    await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.removeColumn("course_users", "is_started",{transaction:t});
    await queryInterface.removeColumn("course_users", "is_completed",{transaction:t});
  })
}  catch (err) {
  throw err;
  }
}
}
