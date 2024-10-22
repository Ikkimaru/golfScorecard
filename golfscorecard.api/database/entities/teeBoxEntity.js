// Location: database/entities/teeBoxEntity.js

const BaseEntity = require('./baseEntity');

class TeeBoxEntity extends BaseEntity {
    constructor(id, golfCourseID, color, yardage, meters, courseRating, coursePar) {
      super(id); // Call the constructor of BaseEntity
      this.golfCourseID = golfCourseID; // ID of the associated golf course
      this.color = color; // Color of the tee box
      this.yardage = yardage; // Yardage for the tee box
      this.meters = meters; // Meters for the tee box
      this.courseRating = courseRating; // Course rating for the tee box
      this.coursePar = coursePar; // Course par for the tee box
    }
  }
  
  module.exports = TeeBoxEntity;
  