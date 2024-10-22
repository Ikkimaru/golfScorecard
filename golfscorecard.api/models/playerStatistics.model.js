// Location: models/playerStatistics.model.js

class PlayerStatistics {
    constructor(playerStatisticsID, playerID, totalGamesPlayed, averageScore, bestScore) {
      this.playerStatisticsID = playerStatisticsID; // Unique ID for the player statistics
      this.playerID = playerID; // Reference to the PlayerID from the Player model
      this.totalGamesPlayed = totalGamesPlayed; // Total number of games played by the player
      this.averageScore = averageScore; // Average score of the player
      this.bestScore = bestScore; // Best score achieved by the player
    }
  }
  
  module.exports = PlayerStatistics;
  