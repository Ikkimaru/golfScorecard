// Location: database/entities/playerEntity.js

const BaseEntity = require('./baseEntity');

class PlayerEntity extends BaseEntity {
  constructor(id, firstName, lastName, email, password, handicapIndex) {
    super(id); // Call the constructor of BaseEntity
    this.firstName = firstName; // First name of the player
    this.lastName = lastName; // Last name of the player
    this.email = email; // Email of the player
    this.password = password; // Hashed password of the player
    this.handicapIndex = handicapIndex; // Handicap index of the player
  }
}

module.exports = PlayerEntity;
