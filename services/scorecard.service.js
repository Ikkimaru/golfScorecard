// Location: services/scorecard.service.js

const ScorecardRepository = require('../repositories/scorecard.repository');

class ScorecardService {
  static addScorecard(scorecard, callback) {
    ScorecardRepository.addScorecard(scorecard, callback);
  }

  static getAllScorecards(callback) {
    ScorecardRepository.getAllScorecards(callback);
  }

  static getScorecardById(id, callback) {
    ScorecardRepository.getScorecardById(id, callback);
  }

  static updateScorecard(id, scorecard, callback) {
    ScorecardRepository.updateScorecard(id, scorecard, callback);
  }

  static deleteScorecard(id, callback) {
    ScorecardRepository.deleteScorecard(id, callback);
  }
}

module.exports = ScorecardService;
