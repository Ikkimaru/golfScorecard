// Location: database/entities/groupgameEntity.js

const BaseEntity = require('./baseEntity');

class GroupgameEntity extends BaseEntity {
    constructor(id, scorecardAID, scorecardBID, scorecardCID, scorecardDID, golfCourseID) {
        super(id); // Call the constructor of BaseEntity
        this.scorecardAID = scorecardAID; // Scorecard ID for Player A
        this.scorecardBID = scorecardBID; // Scorecard ID for Player B
        this.scorecardCID = scorecardCID; // Scorecard ID for Player C
        this.scorecardDID = scorecardDID; // Scorecard ID for Player D
        this.golfCourseID = golfCourseID; // Golf course ID where the game is played
    }
}

module.exports = GroupgameEntity;
