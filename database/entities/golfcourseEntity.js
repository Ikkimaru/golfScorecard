// Location: database/entities/golfcourseEntity.js

class GolfCourseEntity {
  constructor(golfCourseID, courseName, courseLocation, totalHoles) {
    this.golfCourseID = golfCourseID; // Unique identifier for each golf course
    this.courseName = courseName; // Name of the golf course
    this.courseLocation = courseLocation; // Location of the golf course
    this.totalHoles = totalHoles; // Total number of holes on the course
  }
}

module.exports = GolfCourseEntity;
