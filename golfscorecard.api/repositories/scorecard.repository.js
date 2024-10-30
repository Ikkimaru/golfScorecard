// Location: repositories/scorecard.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for Scorecard operations
class ScorecardRepository extends BaseRepository {
  constructor() {
    super(db, 'Scorecard');
  }

  addScorecard(scorecard, callback) {
    const columns = ['playerId', 'golfCourseId', 'teeBoxId', 'weatherId', 'gameDate', 'totalScore', 'handicapIndex', 'courseHandicap', 'playingHandicap'];
    const data = [scorecard.playerId, scorecard.golfCourseId, scorecard.teeBoxId, scorecard.weatherId, scorecard.gameDate, scorecard.totalScore, scorecard.handicapIndex, scorecard.courseHandicap, scorecard.playingHandicap];
    super.add(data, columns, callback);
  }

  getAllScorecards(callback) {
    super.getAll(callback);
  }

  getPlayerScorecards(playerId, callback) {
    const query = `SELECT * FROM Scorecard WHERE PlayerID = ? ORDER BY GameDate`;
    db.all(query, [playerId], (err, rows) => {
      if (err) {
        return callback(err);
      }
      callback(null, rows);
    });
  }

  getScorecardById(id, callback) {
    super.getById(id, callback);
  }

  updateScorecard(id, scorecard, callback) {
    const columns = ['playerId', 'golfCourseId', 'teeBoxId', 'weatherId', 'gameDate', 'totalScore', 'handicapIndex', 'courseHandicap', 'playingHandicap'];
    const data = [scorecard.playerId, scorecard.golfCourseId, scorecard.teeBoxId, scorecard.weatherId, scorecard.gameDate, scorecard.totalScore, scorecard.handicapIndex, scorecard.courseHandicap, scorecard.playingHandicap];
    super.update(id, data, columns, callback);
  }

  deleteScorecard(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new ScorecardRepository();
