"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  try{
   await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable("collection_users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      is_started: {
        type: Sequelize.BOOLEAN,
        defaultValue:true 
      },
      is_completed:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      collectionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "collections",
          key: "id",
        },
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
      await queryInterface.dropTable("collection_users",{transaction:t});
  })
}  
catch (err) {
  throw err;
  }
}
};
