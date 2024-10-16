// Location: services/golfcourse.service.js

const GolfCourseRepository = require('../repositories/golfcourse.repository');
const GolfCourse = require('../models/golfcourse.model'); // Import the GolfCourse model
const GolfCourseEntity = require('../database/entities/golfcourseEntity'); // Import the GolfCourse entities

class GolfCourseService {
  static addGolfCourse(golfCourseData, callback) {
    const golfCourse = new GolfCourse(golfCourseData.courseName, golfCourseData.courseLocation, golfCourseData.coursePar, golfCourseData.isEighteen);
    const golfCourseEntities = new GolfCourseEntity(null, golfCourse.courseName, golfCourse.courseLocation, golfCourse.coursePar, golfCourse.isEighteen);
    GolfCourseRepository.addGolfCourse(golfCourseEntities, callback);
  }

  static getAllGolfCourses(callback) {
    GolfCourseRepository.getAllGolfCourses(callback);
  }

  static getGolfCourseById(id, callback) {
    GolfCourseRepository.getGolfCourseById(id, callback);
  }

  static updateGolfCourse(id, golfCourseData, callback) {
    const golfCourse = new GolfCourse(golfCourseData.courseName, golfCourseData.courseLocation, golfCourseData.coursePar, golfCourseData.isEighteen    );
    const golfCourseEntities = new GolfCourseEntity(id, golfCourse.courseName, golfCourse.courseLocation, golfCourse.coursePar, golfCourse.isEighteen    );
    GolfCourseRepository.updateGolfCourse(id, golfCourseEntities, callback);
  }

  static deleteGolfCourse(id, callback) {
    GolfCourseRepository.deleteGolfCourse(id, callback);
  }
}

module.exports = GolfCourseService;
