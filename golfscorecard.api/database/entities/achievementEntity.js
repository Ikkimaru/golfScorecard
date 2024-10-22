// Location: database/entities/achievementEntity.js

const BaseEntity = require('./baseEntity');

class AchievementEntity extends BaseEntity {
    constructor(id, playerID, achievementDescription, dateAchieved) {
      super(id); // Call the constructor of BaseEntity
      this.playerID = playerID; // Foreign key referencing the player who achieved it
      this.achievementDescription = achievementDescription; // Description of the achievement
      this.dateAchieved = dateAchieved; // Date when the achievement was earned
    }
  }
  
  module.exports = AchievementEntity;
  