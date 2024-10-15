// Location: repositories/player.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for Player operations
class PlayerRepository extends BaseRepository {
  constructor() {
    super(db, 'player');
  }

  addPlayer(player, callback) {
    const columns = ['firstName', 'lastName', 'currentHandicap'];
    const data = [player.firstName, player.lastName, player.currentHandicap];
    super.add(data, columns, callback);
  }

  getAllPlayers(callback) {
    super.getAll(callback);
  }

  getPlayerById(id, callback) {
    super.getById(id, callback);
  }

  updatePlayer(id, player, callback) {
    const columns = ['firstName', 'lastName', 'currentHandicap'];
    const data = [player.firstName, player.lastName, player.currentHandicap];
    super.update(id, data, columns, callback);
  }

  deletePlayer(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new PlayerRepository();
