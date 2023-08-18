"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("step_validations", "exerciseId", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "exercises",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("step_validations", "exerciseId");
  },
};
