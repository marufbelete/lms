"use strict";
// const Sequelize = require("sequelize");
// const { TABLE } = require("../constant/table");
// module.exports = (sequelize, DataTypes) => {
// class  Course extends Sequelize.Model{
//   static associate(models) {
//     const {User,Course_User,Lesson}=models
//     Course.belongsToMany(User, {
//       through: Course_User,
//       foreignKey: "courseId",
//     });
//     Course.hasMany(Course_User,{
//       foreignKey: "courseId",
//     });
//     Course.hasMany(Lesson, {
//       foreignKey: "courseId",
//     });
//   }
// }
// Course.init({
//   id: {
//         type: DataTypes.UUID,
//         defaultValue:DataTypes.UUIDV4,
//         primaryKey: true,
//         allowNull: false,
//     }, 
//     title: {
//           type: DataTypes.STRING,
//           allowNull: false,
//         },
//         description: {
//           type: DataTypes.STRING,
//         },
// },{
//   sequelize,
//   modelName: 'Course',
//   tableName:TABLE.COURSE
// })
// return Course;
// }
//# sourceMappingURL=course.model.js.map