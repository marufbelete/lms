const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const StepInstruction = sequelize.define("step_instruction", {
  id: {
    type: Sequelize.UUID,
    defaultValue:Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  expeted_input: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  error_message: {
    type: Sequelize.STRING,
  },
  suess_message: {
    type: Sequelize.STRING,
  },
  
});

module.exports = StepInstruction;
