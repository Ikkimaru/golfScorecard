// Location: repositories/scorecard.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../databaseManagement');

// Repository for Scorecard operations
class ScorecardRepository extends BaseRepository {
  constructor() {
    super(db, 'scorecard');
  }

  addScorecard(scorecard, callback) {
    const columns = ['player_name', 'golf_course', 'game_type', 'scores'];
    const data = [scorecard.player_name, scorecard.golf_course, scorecard.game_type, JSON.stringify(scorecard.scores)];
    super.add(data, columns, callback);
  }

  getAllScorecards(callback) {
    super.getAll(callback);
  }

  getScorecardById(id, callback) {
    super.getById(id, callback);
  }

  updateScorecard(id, scorecard, callback) {
    const columns = ['player_name', 'golf_course', 'game_type', 'scores'];
    const data = [scorecard.player_name, scorecard.golf_course, scorecard.game_type, JSON.stringify(scorecard.scores)];
    super.update(id, data, columns, callback);
  }

  deleteScorecard(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new ScorecardRepository();
