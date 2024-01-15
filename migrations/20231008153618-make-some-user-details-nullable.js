"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Allow null for first_name
    await queryInterface.changeColumn("users", "first_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Allow null for last_name
    await queryInterface.changeColumn("users", "last_name", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert first_name to disallow null
    await queryInterface.changeColumn("users", "first_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Revert last_name to disallow null
    await queryInterface.changeColumn("users", "last_name", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
