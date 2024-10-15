// Location: models/player.model.js

class Player {
    constructor(firstName, lastName, currentHandicap) {
      this.firstName = firstName; // First name of the player
      this.lastName = lastName; // Last name of the player
      this.currentHandicap = currentHandicap; // Current handicap of the player
    }
  }
  
  module.exports = Player;
  