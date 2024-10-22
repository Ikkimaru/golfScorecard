// Location: database/entities/scoreEntity.js

const BaseEntity = require('./baseEntity');

class ScoreEntity extends BaseEntity {
    constructor(id, scorecardID, holeID, strokes) {
      super(id); // Call the constructor of BaseEntity
      this.scorecardID = scorecardID; // Foreign key to the Scorecard table
      this.holeID = holeID; // Foreign key to the Hole table
      this.strokes = strokes; // Number of strokes taken on the hole
    }
  }
  
  module.exports = ScoreEntity;
  