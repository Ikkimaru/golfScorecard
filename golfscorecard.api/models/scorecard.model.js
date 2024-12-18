// Location: models/scorecard.model.js

class Scorecard {
  constructor(id, playerId, golfCourseId, teeBoxId, weatherId, gameDate, totalScore, handicapIndex, courseHandicap, playingHandicap, playerName, courseName, teeBoxColor, scores) {
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
    this.playerName = playerName; // Populated Player Name
    this.courseName = courseName; // Populated Course Name
    this.teeBoxColor = teeBoxColor; // Populated Tee Box Color
    this.scores = scores; // Add collection of scores for current scorecard
  }
}

module.exports = Scorecard;
