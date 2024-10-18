// Location: models/score.model.js

class Score {
    constructor(scoreID, scorecardID, holeID, strokes) {
      this.scoreID = scoreID; // Unique ID for the score
      this.scorecardID = scorecardID; // Foreign key to the Scorecard table
      this.holeID = holeID; // Foreign key to the Hole table
      this.strokes = strokes; // Number of strokes taken on the hole
    }
  }
  
  module.exports = Score;
  