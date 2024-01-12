"use strict";
const Sequelize = require("sequelize");
const { TABLE } = require("../constant/table");
module.exports = (sequelize, DataTypes) => {
    class Lesson extends Sequelize.Model {
        static associate(models) {
            const { User, Course_User, Course, Lesson_User, Exercise } = models;
            Lesson.hasMany(Course_User, {
                foreignKey: "currentLessonId",
            });
            Lesson.belongsTo(Course, {
                foreignKey: "courseId",
            });
            Lesson.belongsToMany(User, {
                through: Lesson_User,
                foreignKey: "lessonId",
            });
            Lesson.hasMany(Lesson_User, {
                foreignKey: "lessonId",
            });
            Lesson.hasMany(Exercise, {
                foreignKey: "lessonId",
            });
        }
    }
    Lesson.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Lesson',
        tableName: TABLE.LESSON
    });
    return Lesson;
};
//# sourceMappingURL=lesson.model.js.map