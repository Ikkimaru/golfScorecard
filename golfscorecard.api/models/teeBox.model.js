// Location: models/teeBox.model.js

class TeeBox {
    constructor(teeBoxID, golfCourseID, color, yardage, meters, courseRating, coursePar) {
      this.teeBoxID = teeBoxID; // Unique ID for the tee box
      this.golfCourseID = golfCourseID; // ID of the associated golf course
      this.color = color; // Color of the tee box (e.g., Blue, White)
      this.yardage = yardage; // Yardage for this tee box
      this.meters = meters; // Meters for this tee box
      this.courseRating = courseRating; // Course rating for this tee box
      this.coursePar = coursePar; // Course par for this tee box
    }
  }
  
  module.exports = TeeBox;
  