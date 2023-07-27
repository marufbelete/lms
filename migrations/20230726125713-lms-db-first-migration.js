module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // user
      // // Add weight column to lessons table
      // await queryInterface.addColumn(
      //   'exercises',
      //   'weight',
      //   {
      //     type: Sequelize.DataTypes.INTEGER,
      //   },
      //   { transaction }
      // );   
      // // Add currentLessonId column and remove progress column from course_users table
      // await queryInterface.addColumn(
      //   'course_users',
      //   'currentLessonId',
      //   {
      //     type: Sequelize.DataTypes.INTEGER,
      //   },
      //   { transaction }
      // );
      // await queryInterface.removeColumn('course_users', 'progress', { transaction });

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // await queryInterface.removeConstraint('lesson_users', 'lesson_users_courseUserId_fk', { transaction });
      // await queryInterface.removeColumn('lesson_exercises', 'weight', { transaction });
      // await queryInterface.removeColumn('lesson_exercises', 'instruction', { transaction });
      // await queryInterface.removeColumn('lessons', 'weight', { transaction });
      // await queryInterface.removeColumn('lesson_users', 'is_started', { transaction });
      // await queryInterface.addColumn(
      //   'course_users',
      //   'progress',
      //   {
      //     type: Sequelize.DataTypes.INTEGER,
      //   },
      //   { transaction }
      // );
      // await queryInterface.removeColumn('course_users', 'currentLessonId', { transaction });
      // await transaction.commit();
    } 
    catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};

