"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("courses", "collectionId", {
      type: Sequelize.UUID,
      references: {
        model: "collections",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("courses", "collectionId");
  },
};
