// Location: services/player.service.js

const PlayerRepository = require('../repositories/player.repository');
const Player = require('../models/player.model');
const PlayerEntity = require('../database/entities/playerEntity');

class PlayerService {
  static addPlayer(playerData, callback) {
    const player = new Player(playerData.firstName, playerData.lastName, playerData.currentHandicap);
    const playerEntities = new PlayerEntity(null, player.firstName, player.lastName, player.currentHandicap);
    PlayerRepository.addPlayer(playerEntities, callback);
  }

  static getAllPlayers(callback) {
    PlayerRepository.getAllPlayers(callback);
  }

  static getPlayerById(id, callback) {
    PlayerRepository.getPlayerById(id, callback);
  }

  static updatePlayer(id, playerData, callback) {
    const player = new Player(playerData.firstName, playerData.lastName, playerData.currentHandicap);
    const playerEntities = new PlayerEntity(id, player.firstName, player.lastName, player.currentHandicap);
    PlayerRepository.updatePlayer(id, playerEntities, callback);
  }

  static deletePlayer(id, callback) {
    PlayerRepository.deletePlayer(id, callback);
  }
}

module.exports = PlayerService;
