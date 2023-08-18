const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const StepValidation = sequelize.define(
  "step_validation",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    exerciseId: {
      // Foreign key
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "exercise",
        key: "id",
      },
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    input: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    error_message: {
      type: Sequelize.STRING,
    },
    success_message: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true, // enables automatic timestamps (created_at, updated_at)
    createdAt: "created_at", // map the default 'createdAt' field to 'created_at'
    updatedAt: "updated_at", // map the default 'updatedAt' field to 'updated_at'
  }
);

module.exports = StepValidation;
