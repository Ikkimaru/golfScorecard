// Location: services/playerStatistics.service.js

const PlayerStatisticsRepository = require("../repositories/playerStatistics.repository");
const PlayerStatistics = require("../models/playerStatistics.model");
const PlayerStatisticsEntity = require("../database/entities/playerStatisticsEntity");

class PlayerStatisticsService {
  static addPlayerStatistics(playerStatisticsData, callback) {
    try {
      const playerStatistics = new PlayerStatistics(
        null,
        playerStatisticsData.playerID,
        playerStatisticsData.totalGamesPlayed,
        playerStatisticsData.averageScore,
        playerStatisticsData.bestScore
      );
      const playerStatisticsEntity = new PlayerStatisticsEntity(
        null,
        playerStatistics.playerID,
        playerStatistics.totalGamesPlayed,
        playerStatistics.averageScore,
        playerStatistics.bestScore
      );

      PlayerStatisticsRepository.addPlayerStatistics(playerStatisticsEntity, (err, id) => {
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

  static getAllPlayerStatistics(callback) {
    PlayerStatisticsRepository.getAllPlayerStatistics((err, playerStatistics) => {
      if (err) {
        callback(err);
      } else {
        callback(null, playerStatistics);
      }
    });
  }

  static getPlayerStatisticsById(id, callback) {
    PlayerStatisticsRepository.getPlayerStatisticsById(id, (err, playerStatistics) => {
      if (err) {
        callback(err);
      } else {
        callback(null, playerStatistics);
      }
    });
  }

  static updatePlayerStatistics(id, playerStatisticsData, callback) {
    try {
      const playerStatistics = new PlayerStatistics(
        id,
        playerStatisticsData.playerID,
        playerStatisticsData.totalGamesPlayed,
        playerStatisticsData.averageScore,
        playerStatisticsData.bestScore
      );
      const playerStatisticsEntity = new PlayerStatisticsEntity(
        id,
        playerStatistics.playerID,
        playerStatistics.totalGamesPlayed,
        playerStatistics.averageScore,
        playerStatistics.bestScore
      );

      PlayerStatisticsRepository.updatePlayerStatistics(id, playerStatisticsEntity, (err, changes) => {
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

  static deletePlayerStatistics(id, callback) {
    PlayerStatisticsRepository.deletePlayerStatistics(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = PlayerStatisticsService;
