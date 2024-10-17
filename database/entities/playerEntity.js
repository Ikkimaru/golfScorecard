// Location: database/entities/playerEntity.js

class PlayerEntity {
  constructor(playerID, firstName, lastName, email, handicapIndex) {
    this.playerID = playerID; // Unique identifier for each player
    this.firstName = firstName; // First name of the player
    this.lastName = lastName; // Last name of the player
    this.email = email; // Email of the player
    this.handicapIndex = handicapIndex; // Handicap index of the player
  }
}

module.exports = PlayerEntity;
