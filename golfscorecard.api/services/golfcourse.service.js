// Location: services/golfcourse.service.js

const GolfCourseRepository = require('../repositories/golfcourse.repository');
const GolfCourse = require('../models/golfcourse.model');
const GolfCourseEntity = require('../database/entities/golfcourseEntity');

class GolfCourseService {
  static addGolfCourse(golfCourseData, callback) {
    try {
      const golfCourse = new GolfCourse(
        null,
        golfCourseData.courseName,
        golfCourseData.courseLocation,
        golfCourseData.totalHoles
      );
      const golfCourseEntity = new GolfCourseEntity(
        null,
        golfCourse.courseName,
        golfCourse.courseLocation,
        golfCourse.totalHoles
      );
      GolfCourseRepository.addGolfCourse(golfCourseEntity, (err, id) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id });
        }
      });
    } catch (err) {
      callback(err, null);
    }
  }

  static getAllGolfCourses(callback) {
    GolfCourseRepository.getAllGolfCourses((err, golfCourses) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, golfCourses);
      }
    });
  }

  static getGolfCourseById(id, callback) {
    GolfCourseRepository.getGolfCourseById(id, (err, golfCourse) => {
      if (err) {
        callback(err, null);
      } else if (!golfCourse) {
        callback(new Error(`Golf course with ID ${id} not found`), null);
      } else {
        callback(null, golfCourse);
      }
    });
  }

  static updateGolfCourse(id, golfCourseData, callback) {
    try {
      const golfCourseEntity = new GolfCourseEntity(
        id,
        golfCourseData.courseName,
        golfCourseData.courseLocation,
        golfCourseData.totalHoles
      );
      GolfCourseRepository.updateGolfCourse(id, golfCourseEntity, (err, changes) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, changes);
        }
      });
    } catch (err) {
      callback(err, null);
    }
  }

  static deleteGolfCourse(id, callback) {
    GolfCourseRepository.deleteGolfCourse(id, (err, changes) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = GolfCourseService;
