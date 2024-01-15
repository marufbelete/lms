"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  try{
   await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable("collections", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },{transaction:t});
    })
  } catch (err) {
    throw err;
   }
  },

  down: async (queryInterface) => {
    try{
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("collections",{transaction:t});
  })
}  
catch (err) {
  throw err;
  }
}
};
