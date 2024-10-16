// Location: repositories/golfcourse.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for GolfCourse operations
class GolfCourseRepository extends BaseRepository {
  constructor() {
    super(db, 'golfcourse');
  }

  addGolfCourse(golfCourse, callback) {
    const columns = ['courseName', 'courseLocation', 'coursePar', 'isEighteen'];
    const data = [golfCourse.courseName, golfCourse.courseLocation, golfCourse.coursePar, golfCourse.isEighteen];
    super.add(data, columns, callback);
  }

  getAllGolfCourses(callback) {
    super.getAll(callback);
  }

  getGolfCourseById(id, callback) {
    super.getById(id, callback);
  }

  updateGolfCourse(id, golfCourse, callback) {
    const columns = ['courseName', 'courseLocation', 'coursePar', 'isEighteen'];
    const data = [golfCourse.courseName, golfCourse.courseLocation, golfCourse.coursePar, golfCourse.isEighteen];
    super.update(id, data, columns, callback);
  }

  deleteGolfCourse(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new GolfCourseRepository();
