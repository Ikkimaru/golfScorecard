// Location: models/golfcourse.model.js

class GolfCourse {
  constructor(golfCourseID, courseName, courseLocation, totalHoles) {
    this.golfCourseID = golfCourseID; // Unique ID for the golf course
    this.courseName = courseName; // Name of the golf course
    this.courseLocation = courseLocation; // Location of the golf course
    this.totalHoles = totalHoles; // Total number of holes on the course
  }
}

module.exports = GolfCourse;
