"use strict";
const Sequelize = require("sequelize");
const { TABLE } = require("../constant/table");
module.exports = (sequelize, DataTypes) => {
    class Exercise extends Sequelize.Model {
        static associate(models) {
            const { User, Exercise_User, Test, Lesson, StepValidation } = models;
            Exercise.belongsToMany(User, {
                through: Exercise_User,
                foreignKey: "exerciseId",
            });
            Exercise.hasMany(Exercise_User, {
                foreignKey: "exerciseId",
            });
            Exercise.hasMany(Test, {
                foreignKey: "exId",
            });
            Exercise.belongsTo(Lesson, {
                foreignKey: "lessonId",
            });
            Exercise.hasOne(StepValidation, {
                foreignKey: "exerciseId"
            });
        }
    }
    Exercise.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        instruction: {
            type: DataTypes.STRING,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Exercise',
        tableName: TABLE.EXERCISE
    });
    return Exercise;
};
//# sourceMappingURL=exercise.model.js.map