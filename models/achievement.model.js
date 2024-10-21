// Location: models/achievement.model.js

class Achievement {
    constructor(achievementID, playerID, achievementDescription, dateAchieved) {
      this.achievementID = achievementID; // Unique ID for the achievement
      this.playerID = playerID; // ID of the player who achieved it
      this.achievementDescription = achievementDescription; // Description of the achievement
      this.dateAchieved = dateAchieved; // Date the achievement was earned
    }
  }
  
  module.exports = Achievement;
  