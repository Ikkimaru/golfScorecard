// Location: services/scorecard.service.js

const ScorecardRepository = require('../repositories/scorecard.repository');
const Scorecard = require('../models/scorecard.model');
const ScorecardEntity = require('../database/entities/scorecardEntity');

class ScorecardService {
  static addScorecard(scorecardData, callback) {
    const { playerId, golf_course, game_type, scores } = scorecardData;

    // Validate scores
    if (!Array.isArray(scores)) {
      return callback(new Error('Scores must be an array of integers.'));
    }

    const maxHoles = game_type === '9-hole' ? 9 : 18;
    if (scores.length !== maxHoles) {
      return callback(new Error(`For a ${game_type}, you must provide ${maxHoles} scores.`));
    }

    // Create Scorecard instance
    const scorecard = new Scorecard(null, playerId, golf_course, game_type, scores);
    const scorecardEntities = new ScorecardEntity(null, playerId, golf_course, game_type, scores);
    ScorecardRepository.addScorecard(scorecardEntities, callback);
  }

  static getAllScorecards(callback) {
    ScorecardRepository.getAllScorecards((err, rows) => {
      if (err) {
        return callback(err);
      }
      rows.forEach(row => row.scores = JSON.parse(row.scores)); // Convert scores back to array
      callback(null, rows);
    });
  }

  static getScorecardById(id, callback) {
    ScorecardRepository.getScorecardById(id, (err, row) => {
      if (err) {
        return callback(err);
      }
      if (!row) {
        return callback(null, null); // No scorecard found
      }
      row.scores = JSON.parse(row.scores); // Convert scores back to array
      callback(null, row);
    });
  }

  static updateScorecard(id, scorecardData, callback) {
    const { playerId, golf_course, game_type, scores } = scorecardData;

    // Validate scores
    if (!Array.isArray(scores)) {
      return callback(new Error('Scores must be an array of integers.'));
    }

    const maxHoles = game_type === '9-hole' ? 9 : 18;
    if (scores.length !== maxHoles) {
      return callback(new Error(`For a ${game_type}, you must provide ${maxHoles} scores.`));
    }

    // Create Scorecard instance
    const scorecard = new Scorecard(id, playerId, golf_course, game_type, scores);
    const scorecardEntities = new ScorecardEntity(id, playerId, golf_course, game_type, scores);
    ScorecardRepository.updateScorecard(id, scorecardEntities, callback);
  }

  static deleteScorecard(id, callback) {
    ScorecardRepository.deleteScorecard(id, callback);
  }
}

module.exports = ScorecardService;
