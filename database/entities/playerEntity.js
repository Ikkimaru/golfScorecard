// Location: database/entities/playerEntity.js

class PlayerEntity {
    constructor(id, firstName, lastName, currentHandicap) {
      this.id = id; // Unique identifier for each player
      this.firstName = firstName; // First name of the player
      this.lastName = lastName; // Last name of the player
      this.currentHandicap = currentHandicap; // Current handicap of the player
    }
  }
  
  module.exports = PlayerEntity;
  