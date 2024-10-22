// Location: database/entities/scorecardEntity.js

const BaseEntity = require('./baseEntity');

class ScorecardEntity extends BaseEntity {
  constructor(id, playerId, golfCourseId, teeBoxId, weatherId, gameDate, totalScore, handicapIndex, courseHandicap, playingHandicap, scores) {
    this.id = id; // Unique identifier for each scorecard
    this.playerId = playerId; // Foreign key for the player
    this.golfCourseId = golfCourseId; // Foreign key for the golf course
    this.teeBoxId = teeBoxId; // Foreign key for the tee box
    this.weatherId = weatherId; // Foreign key for the weather conditions
    this.gameDate = gameDate; // Date of the game
    this.totalScore = totalScore; // Total score for the game
    this.handicapIndex = handicapIndex; // Player's handicap index
    this.courseHandicap = courseHandicap; // Course handicap
    this.playingHandicap = playingHandicap; // Playing handicap
  }
}

module.exports = ScorecardEntity;
