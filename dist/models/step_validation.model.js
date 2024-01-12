"use strict";
// const Sequelize = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
// class  StepValidation extends Sequelize.Model{
//   static associate(models) {
//     const {Exercise}=models
//     StepValidation.belongsTo(Exercise,{
//       foreignKey: "exerciseId",
//     });
//   }
// }
// StepValidation.init({
//   id: {
//     type: DataTypes.UUID,
//     defaultValue:DataTypes.UUIDV4,
//     primaryKey: true,
//     allowNull: false,
//     }, 
//   exerciseId: {
//     // Foreign key
//     type: DataTypes.UUID,
//     allowNull: false,
//     references: {
//       model: "exercises",
//       key: "id",
//     },
//   },
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   input: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   error_message: {
//     type: DataTypes.STRING,
//   },
//   success_message: {
//     type: DataTypes.STRING,
//   },
// },{
//   sequelize,
//   modelName: 'StepValidation',
//   tableName: 'step_validations'
// })
// return StepValidation;
// }
//# sourceMappingURL=step_validation.model.js.map