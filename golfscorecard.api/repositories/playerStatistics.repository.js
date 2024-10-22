// Location: repositories/playerStatistics.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for PlayerStatistics operations
class PlayerStatisticsRepository extends BaseRepository {
  constructor() {
    super(db, 'PlayerStatistics');
  }

  addPlayerStatistics(playerStatistics, callback) {
    const columns = ['playerID', 'totalGamesPlayed', 'averageScore', 'bestScore'];
    const data = [
      playerStatistics.playerID,
      playerStatistics.totalGamesPlayed,
      playerStatistics.averageScore,
      playerStatistics.bestScore,
    ];
    super.add(data, columns, callback);
  }

  getAllPlayerStatistics(callback) {
    super.getAll(callback);
  }

  getPlayerStatisticsById(id, callback) {
    super.getById(id, callback);
  }

  updatePlayerStatistics(id, playerStatistics, callback) {
    const columns = ['playerID', 'totalGamesPlayed', 'averageScore', 'bestScore'];
    const data = [
      playerStatistics.playerID,
      playerStatistics.totalGamesPlayed,
      playerStatistics.averageScore,
      playerStatistics.bestScore,
    ];
    super.update(id, data, columns, callback);
  }

  deletePlayerStatistics(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new PlayerStatisticsRepository();
