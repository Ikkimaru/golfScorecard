// Location: services/scorecard.service.js

const ScorecardRepository = require('../repositories/scorecard.repository');
const ScorecardEntity = require('../database/entities/scorecardEntity');

class ScorecardService {
  static addScorecard(scorecardData, callback) {
    try {
      const { playerId, golf_course, game_type, scores } = scorecardData;

      // Validate scores
      if (!Array.isArray(scores) || scores.some(score => typeof score !== 'number')) {
        throw new Error('Scores must be an array of integers.');
      }

      const maxHoles = game_type === '9-hole' ? 9 : 18;
      if (scores.length !== maxHoles) {
        throw new Error(`For a ${game_type}, you must provide ${maxHoles} scores.`);
      }

      // Create ScorecardEntity instance
      const scorecardEntity = new ScorecardEntity(null, playerId, golf_course, game_type, scores);
      ScorecardRepository.addScorecard(scorecardEntity, (err, id) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id });
        }
      });
    } catch (err) {
      callback(err, null);
    }
  }

  static getAllScorecards(callback) {
    ScorecardRepository.getAllScorecards((err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        rows.forEach(row => row.scores = JSON.parse(row.scores)); // Convert scores back to array
        callback(null, rows);
      }
    });
  }

  static getScorecardById(id, callback) {
    ScorecardRepository.getScorecardById(id, (err, row) => {
      if (err) {
        callback(err, null);
      } else if (!row) {
        callback(new Error(`Scorecard with ID ${id} not found`), null);
      } else {
        row.scores = JSON.parse(row.scores); // Convert scores back to array
        callback(null, row);
      }
    });
  }

  static updateScorecard(id, scorecardData, callback) {
    try {
      const { playerId, golf_course, game_type, scores } = scorecardData;

      // Validate scores
      if (!Array.isArray(scores) || scores.some(score => typeof score !== 'number')) {
        throw new Error('Scores must be an array of integers.');
      }

      const maxHoles = game_type === '9-hole' ? 9 : 18;
      if (scores.length !== maxHoles) {
        throw new Error(`For a ${game_type}, you must provide ${maxHoles} scores.`);
      }

      // Create ScorecardEntity instance
      const scorecardEntity = new ScorecardEntity(id, playerId, golf_course, game_type, scores);
      ScorecardRepository.updateScorecard(id, scorecardEntity, (err, changes) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, changes);
        }
      });
    } catch (err) {
      callback(err, null);
    }
  }

  static deleteScorecard(id, callback) {
    ScorecardRepository.deleteScorecard(id, (err, changes) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = ScorecardService;
