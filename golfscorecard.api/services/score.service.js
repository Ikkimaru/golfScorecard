// Location: services/score.service.js

const ScoreRepository = require("../repositories/score.repository");
const Score = require("../models/score.model");
const ScoreEntity = require("../database/entities/scoreEntity");

class ScoreService {
  static addScore(scoreData, callback) {
    try {
      const score = new Score(
        null, // ScoreID will be auto-generated
        scoreData.scorecardID,
        scoreData.holeID,
        scoreData.strokes
      );

      const scoreEntity = new ScoreEntity(
        null, // ScoreID will be auto-generated
        score.scorecardID,
        score.holeID,
        score.strokes
      );

      ScoreRepository.addScore(scoreEntity, (err, id) => {
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

  static getAllScores(callback) {
    ScoreRepository.getAllScores((err, scores) => {
      if (err) {
        callback(err);
      } else {
        callback(null, scores);
      }
    });
  }

  static getScoreById(id, callback) {
    ScoreRepository.getScoreById(id, (err, score) => {
      if (err) {
        callback(err);
      } else {
        callback(null, score);
      }
    });
  }

  static getScoresByScorecardId(id, callback) {
    ScoreRepository.getScoresByScorecardId(id, (err, score) => {
      if (err) {
        callback(err);
      } else {
        callback(null, score);
      }
    });
  }

  static updateScore(id, scoreData, callback) {
    try {
      const score = new Score(
        id,
        scoreData.scorecardID,
        scoreData.holeID,
        scoreData.strokes
      );

      const scoreEntity = new ScoreEntity(
        id,
        score.scorecardID,
        score.holeID,
        score.strokes
      );

      ScoreRepository.updateScore(id, scoreEntity, (err, changes) => {
        if (err) {
          callback(err);
        } else {
          callback(null, changes);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static deleteScore(id, callback) {
    ScoreRepository.deleteScore(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = ScoreService;
