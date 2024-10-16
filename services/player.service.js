// Location: services/player.service.js

const PlayerRepository = require('../repositories/player.repository');
const Player = require('../models/player.model');
const PlayerEntity = require('../database/entities/playerEntity');

class PlayerService {
  static addPlayer(playerData, callback) {
    const player = new Player(playerData.firstName, playerData.lastName, playerData.currentHandicap);
    const playerEntity = new PlayerEntity(null, player.firstName, player.lastName, player.currentHandicap);
    
    PlayerRepository.addPlayer(playerEntity, (err, id) => {
      if (err) {
        callback(err);
      } else {
        callback(null, id);
      }
    });
  }

  static getAllPlayers(callback) {
    PlayerRepository.getAllPlayers((err, players) => {
      if (err) {
        callback(err);
      } else {
        callback(null, players);
      }
    });
  }

  static getPlayerById(id, callback) {
    PlayerRepository.getPlayerById(id, (err, player) => {
      if (err) {
        callback(err);
      } else {
        callback(null, player);
      }
    });
  }

  static updatePlayer(id, playerData, callback) {
    const player = new Player(playerData.firstName, playerData.lastName, playerData.currentHandicap);
    const playerEntity = new PlayerEntity(id, player.firstName, player.lastName, player.currentHandicap);
    
    PlayerRepository.updatePlayer(id, playerEntity, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }

  static deletePlayer(id, callback) {
    PlayerRepository.deletePlayer(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = PlayerService;
