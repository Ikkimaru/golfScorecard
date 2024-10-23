// Location: repositories/score.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for Score operations
class ScoreRepository extends BaseRepository {
  constructor() {
    super(db, 'Score');
  }

  addScore(score, callback) {
    const columns = ['scorecardID', 'holeID', 'strokes'];
    const data = [score.scorecardID, score.holeID, score.strokes];
    super.add(data, columns, callback);
  }

  getAllScores(callback) {
    super.getAll(callback);
  }

  getScoreById(id, callback) {
    super.getById(id, callback);
  }

  updateScore(id, score, callback) {
    const columns = ['scorecardID', 'holeID', 'strokes'];
    const data = [score.scorecardID, score.holeID, score.strokes];
    super.update(id, data, columns, callback);
  }

  deleteScore(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new ScoreRepository();