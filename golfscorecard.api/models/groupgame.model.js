// Location: models/groupgame.model.js

class GroupGame {
    constructor(id, scorecardAID, scorecardBID, scorecardCID, scorecardDID, golfCourseID) {
        this.id = id; // Unique ID for the group game
        this.scorecardAID = scorecardAID; // Scorecard ID for Player A
        this.scorecardBID = scorecardBID; // Scorecard ID for Player B
        this.scorecardCID = scorecardCID; // Scorecard ID for Player C
        this.scorecardDID = scorecardDID; // Scorecard ID for Player D
        this.golfCourseID = golfCourseID; // Golf course ID where the game is played
    }
}

module.exports = GroupGame;
