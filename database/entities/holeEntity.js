// Location: database/entities/holeEntity.js

class HoleEntity {
  constructor(holeID, golfCourseID, teeBoxID, holeNumber, par, HandicapStroke, yardage, meters) {
    this.holeID = holeID; // Unique identifier for each hole (Primary Key)
    this.golfCourseID = golfCourseID; // Foreign key referencing GolfCourse
    this.teeBoxID = teeBoxID; // Foreign key referencing TeeBox
    this.holeNumber = holeNumber; // The number of the hole on the course
    this.par = par; // Par for the hole
    this.HandicapStroke = HandicapStroke // Strokes added for current handicap 
    this.yardage = yardage; // Yardage of the hole (optional)
    this.meters = meters; // Meters for the hole (optional)
  }
}

module.exports = HoleEntity;
