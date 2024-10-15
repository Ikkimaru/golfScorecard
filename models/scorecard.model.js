// Location: models/scorecard.model.js

class Scorecard {
    constructor(id, player_name, golf_course, game_type, scores) {
      this.id = id; // Unique identifier for each scorecard
      this.player_name = player_name; // Name of the player
      this.golf_course = golf_course; // Name of the golf course
      this.game_type = game_type; // Game type, either '9-hole' or '18-hole'
      this.scores = scores; // Array of scores, length 9 or 18 based on game type
    }
  }
  
  module.exports = Scorecard;
  