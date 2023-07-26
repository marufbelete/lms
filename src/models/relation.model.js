const User = require("./user.model"); 
const Role = require("./role.model");
const Course = require("./course.model");
const Lesson = require("./lesson.model");
const User_Role = require("./user_role.model");
const Course_User = require("./course_user.model");
const Exercise = require("./exercise.model");
const Lesson_User = require("./lesson_user.model");
const Exercise_User = require("./exercise_user.model");

const Relation = () => {
   //role to user
  User.belongsToMany(Role, { through: User_Role });
  Role.belongsToMany(User, { through: User_Role });
  User.hasMany(User_Role);
  User_Role.belongsTo(User);
  Role.hasMany(User_Role);
  User_Role.belongsTo(Role);

  //course to user
  User.belongsToMany(Course,{
    through:Course_User
  });
  Course.belongsToMany(User,{
    through:Course_User
  });
  User.hasMany(Course_User);
  Course_User.belongsTo(User);
  Course.hasMany(Course_User);
  Course_User.belongsTo(Course);
  
  //lesson to user
  User.belongsToMany(Lesson,{
    through:Lesson_User
  });
  Course.belongsToMany(User,{
    through:Lesson_User
  });
  User.hasMany(Lesson_User);
  Lesson_User.belongsTo(User);
  Lesson.hasMany(Lesson_User);
  Lesson_User.belongsTo(Lesson);
  
  //exercise to user
  User.belongsToMany(Exercise,{
    through:Exercise_User
  });
  Exercise.belongsToMany(User,{
    through:Exercise_User
  });
  User.hasMany(Exercise_User);
  Exercise_User.belongsTo(User);
  Exercise.hasMany(Exercise_User);
  Exercise_User.belongsTo(Exercise);
  
  //course to lesson
  Course.hasMany(Lesson,{
    foreignKey: 'courseId',
  });
  Lesson.belongsTo(Course,{
    foreignKey: 'courseId',
  });

  //course_user to lesson
  Lesson.hasMany(Course_User,{
    foreignKey: 'currentLessonId',
  });
  Course_User.belongsTo(Lesson,{
    foreignKey: 'currentLessonId',
  });
 
  //course_user to lesson_user
  Course_User.hasMany(Lesson_User,{
    foreignKey: 'courseUserId',
  });
  Lesson_User.belongsTo(Course_User,{
    foreignKey: 'courseUserId',
  });

  //course_user to lesson_user
  Lesson_User.hasMany(Exercise_User,{
    foreignKey: 'lessonUserId',
  });
  Exercise_User.belongsTo(Lesson_User,{
    foreignKey: 'lessonUserId',
  });

  //lesson to exercise
  Lesson.hasMany(Exercise,{
    foreignKey: 'lessonId',
  });
  Exercise.belongsTo(Lesson,{
    foreignKey: 'lessonId',
  });

 
 };
module.exports = Relation;
