// Location: repositories/golfcourse.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for GolfCourse operations
class GolfCourseRepository extends BaseRepository {
  constructor() {
    super(db, 'GolfCourse');
  }

  addGolfCourse(golfCourse, callback) {
    const columns = ['CourseName', 'Location', 'TotalHoles'];
    const data = [golfCourse.courseName, golfCourse.courseLocation, golfCourse.totalHoles];
    super.add(data, columns, callback);
  }

  getAllGolfCourses(callback) {
    super.getAll(callback);
  }

  getGolfCourseById(id, callback) {
    super.getById(id, callback);
  }

  updateGolfCourse(id, golfCourse, callback) {
    const columns = ['CourseName', 'Location', 'TotalHoles'];
    const data = [golfCourse.courseName, golfCourse.courseLocation, golfCourse.totalHoles];
    super.update(id, data, columns, callback);
  }

  deleteGolfCourse(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new GolfCourseRepository();
