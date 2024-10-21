// Location: database/entities/playerStatisticsEntity.js

const BaseEntity = require('./baseEntity');

class PlayerStatisticsEntity extends BaseEntity {
    constructor(id, playerID, totalGamesPlayed, averageScore, bestScore) {
      super(id); // Call the constructor of BaseEntity
      this.playerID = playerID; // Reference to the PlayerID from the Player model
      this.totalGamesPlayed = totalGamesPlayed; // Total number of games played by the player
      this.averageScore = averageScore; // Average score of the player
      this.bestScore = bestScore; // Best score achieved by the player
    }
  }
  
  module.exports = PlayerStatisticsEntity;
  