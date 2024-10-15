// Location: database/entities/scorecardEntity.js

class ScorecardEntity {
  constructor(id, playerId, golf_course, game_type, scores) {
      this.id = id; // Unique identifier for each scorecard
      this.playerId = playerId; // Foreign key for the player
      this.golf_course = golf_course; // Name of the golf course
      this.game_type = game_type; // Type of game (9-hole or 18-hole)
      this.scores = scores; // Array of scores for the holes
  }
}

module.exports = ScorecardEntity;
  