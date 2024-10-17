// Location: database/entities/teeBoxEntity.js

class TeeBoxEntity {
    constructor(teeBoxID, golfCourseID, color, yardage, meters, courseRating, coursePar) {
      this.teeBoxID = teeBoxID; // Unique identifier for each tee box
      this.golfCourseID = golfCourseID; // ID of the associated golf course
      this.color = color; // Color of the tee box
      this.yardage = yardage; // Yardage for the tee box
      this.meters = meters; // Meters for the tee box
      this.courseRating = courseRating; // Course rating for the tee box
      this.coursePar = coursePar; // Course par for the tee box
    }
  }
  
  module.exports = TeeBoxEntity;
  