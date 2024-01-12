"use strict";
const Sequelize = require("sequelize");
const { TABLE } = require("../constant/table");
module.exports = (sequelize, DataTypes) => {
    class Course_User extends Sequelize.Model {
        static associate(models) {
            const { Course, User, Lesson, Lesson_User } = models;
            Course_User.belongsTo(User, {
                foreignKey: "userId",
            });
            Course_User.belongsTo(Course, {
                foreignKey: "courseId",
            });
            Course_User.belongsTo(Lesson, {
                foreignKey: "currentLessonId",
            });
            Course_User.hasMany(Lesson_User, {
                foreignKey: "courseUserId",
            });
        }
    }
    Course_User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Course_User',
        tableName: TABLE.COURSE_USER
    });
    return Course_User;
};
//# sourceMappingURL=course_user.model.js.map