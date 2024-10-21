// Location: database/entities/golfcourseEntity.js

const BaseEntity = require('./baseEntity');

class GolfCourseEntity extends BaseEntity {
  constructor(id, courseName, courseLocation, totalHoles) {
    super(id); // Call the constructor of BaseEntity
    this.courseName = courseName; // Name of the golf course
    this.courseLocation = courseLocation; // Location of the golf course
    this.totalHoles = totalHoles; // Total number of holes on the course
  }
}

module.exports = GolfCourseEntity;
