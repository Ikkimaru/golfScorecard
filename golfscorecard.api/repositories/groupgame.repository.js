// Location: repositories/groupgame.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for GroupGame operations
class GroupgameRepository extends BaseRepository {
    constructor() {
        super(db, 'GroupGame');
    }

    addGroupGame(groupGame, callback) {
        const columns = ['scorecardAID', 'scorecardBID', 'scorecardCID', 'scorecardDID', 'golfCourseID'];
        const data = [
            groupGame.scorecardAID,
            groupGame.scorecardBID,
            groupGame.scorecardCID,
            groupGame.scorecardDID,
            groupGame.golfCourseID
        ];
        super.add(data, columns, callback);
    }

    getAllGroupGames(callback) {
        super.getAll(callback);
    }

    getGroupGameById(id, callback) {
        super.getById(id, callback);
    }

    updateGroupGame(id, groupGame, callback) {
        const columns = ['scorecardAID', 'scorecardBID', 'scorecardCID', 'scorecardDID', 'golfCourseID'];
        const data = [
            groupGame.scorecardAID,
            groupGame.scorecardBID,
            groupGame.scorecardCID,
            groupGame.scorecardDID,
            groupGame.golfCourseID
        ];
        super.update(id, data, columns, callback);
    }

    deleteGroupGame(id, callback) {
        super.delete(id, callback);
    }
}

module.exports = new GroupgameRepository();
