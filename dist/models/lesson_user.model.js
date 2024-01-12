"use strict";
const Sequelize = require("sequelize");
const { TABLE } = require("../constant/table");
module.exports = (sequelize, DataTypes) => {
    class Lesson_User extends Sequelize.Model {
        static associate(models) {
            const { User, Course_User, Lesson, Exercise_User } = models;
            Lesson_User.belongsTo(Course_User, {
                foreignKey: "courseUserId",
            });
            Lesson_User.belongsTo(User, {
                foreignKey: "userId",
            });
            Lesson_User.belongsTo(Lesson, {
                foreignKey: "lessonId",
            });
            Lesson_User.hasMany(Exercise_User, {
                foreignKey: "lessonUserId",
            });
        }
    }
    Lesson_User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        is_started: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Lesson_User',
        tableName: TABLE.LESSON_USER
    });
    return Lesson_User;
};
//# sourceMappingURL=lesson_user.model.js.map