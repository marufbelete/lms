"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  try{
   await queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable("prerequisites", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      requisiteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
      },
      prereqId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "courses",
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
    });
    })
  } catch (err) {
    throw err;
  }
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("prerequisites");
  },
};
