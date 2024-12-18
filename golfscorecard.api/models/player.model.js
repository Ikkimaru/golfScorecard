// Location: models/player.model.js

class Player {
  constructor(playerID, firstName, lastName, email, password, handicapIndex) {
    this.playerID = playerID; // Unique ID for the player
    this.firstName = firstName; // First name of the player
    this.lastName = lastName; // Last name of the player
    this.email = email; // Email of the player
    this.password = password; // Hashed password of the player
    this.handicapIndex = handicapIndex; // Handicap index of the player
  }
}

module.exports = Player;
