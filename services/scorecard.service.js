// Location: services/scorecard.service.js

const ScorecardRepository = require("../repositories/scorecard.repository");
const Scorecard = require("../models/scorecard.model");
const ScorecardEntity = require("../database/entities/scorecardEntity");

class ScorecardService {
  static addScorecard(scorecardData, callback) {
    try {
      const scorecard = new Scorecard(
        null,
        scorecardData.playerId,
        scorecardData.golfCourseId,
        scorecardData.teeBoxId,
        scorecardData.weatherId,
        scorecardData.gameDate,
        scorecardData.totalScore,
        scorecardData.handicapIndex,
        scorecardData.courseHandicap,
        scorecardData.playingHandicap
      );

      const scorecardEntity = new ScorecardEntity(
        null,
        scorecard.playerId,
        scorecard.golfCourseId,
        scorecard.teeBoxId,
        scorecard.weatherId,
        scorecard.gameDate,
        scorecard.totalScore,
        scorecard.handicapIndex,
        scorecard.courseHandicap,
        scorecard.playingHandicap
      );

      ScorecardRepository.addScorecard(scorecardEntity, (err, id) => {
        if (err) {
          callback(err);
        } else {
          callback(null, id);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static getAllScorecards(callback) {
    ScorecardRepository.getAllScorecards((err, scorecards) => {
      if (err) {
        callback(err);
      } else {
        callback(null, scorecards);
      }
    });
  }

  static getScorecardById(id, callback) {
    ScorecardRepository.getScorecardById(id, (err, scorecard) => {
      if (err) {
        callback(err);
      } else {
        callback(null, scorecard);
      }
    });
  }

  static updateScorecard(id, scorecardData, callback) {
    try {
      const scorecard = new Scorecard(
        id,
        scorecardData.playerId,
        scorecardData.golfCourseId,
        scorecardData.teeBoxId,
        scorecardData.weatherId,
        scorecardData.gameDate,
        scorecardData.totalScore,
        scorecardData.handicapIndex,
        scorecardData.courseHandicap,
        scorecardData.playingHandicap
      );

      const scorecardEntity = new ScorecardEntity(
        id,
        scorecard.playerId,
        scorecard.golfCourseId,
        scorecard.teeBoxId,
        scorecard.weatherId,
        scorecard.gameDate,
        scorecard.totalScore,
        scorecard.handicapIndex,
        scorecard.courseHandicap,
        scorecard.playingHandicap
      );

      ScorecardRepository.updateScorecard(
        id,
        scorecardEntity,
        (err, changes) => {
          if (err) {
            callback(err);
          } else {
            callback(null, changes);
          }
        }
      );
    } catch (err) {
      callback(err);
    }
  }

  static deleteScorecard(id, callback) {
    ScorecardRepository.deleteScorecard(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = ScorecardService;
