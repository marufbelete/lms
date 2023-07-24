const User = require("./user.model"); 
const Role = require("./role.model");
const Course = require("./course.model");
const Lesson = require("./lesson.model");
const User_Role = require("./user_role.model");
const Course_User = require("./course_user.model");
const Exercise = require("./exercise.model");

const Relation = () => {
   //role to user
  User.belongsToMany(Role, { through: User_Role });
  Role.belongsToMany(User, { through: User_Role });
   
  //course to user
  User.belongsToMany(Course,{
    through:Course_User
  });
  Course.belongsToMany(User,{
    through:Course_User
  });

  //course to lesson
  Course.hasMany(Lesson,{
    foreignKey: 'courseId',
  });
  Lesson.belongsTo(Course,{
    foreignKey: 'courseId',
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
