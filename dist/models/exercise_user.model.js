"use strict";
const Sequelize = require("sequelize");
const { TABLE } = require("../constant/table");
module.exports = (sequelize, DataTypes) => {
    class Exercise_User extends Sequelize.Model {
        static associate(models) {
            const { User, Lesson_User, Exercise } = models;
            Exercise_User.belongsTo(Lesson_User, {
                foreignKey: "lessonUserId",
            });
            Exercise_User.belongsTo(User, {
                foreignKey: "userId",
            });
            Exercise_User.belongsTo(Exercise, {
                foreignKey: "exerciseId",
            });
        }
    }
    Exercise_User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Exercise_User',
        tableName: TABLE.EXERCISE_USER
    });
    return Exercise_User;
};
//# sourceMappingURL=exercise_user.model.js.map