// Location: services/player.service.js

const PlayerRepository = require('../repositories/player.repository');
const Player = require('../models/player.model');
const PlayerEntity = require('../database/entities/playerEntity');

class PlayerService {
  static addPlayer(playerData, callback) {
    try {
      const player = new Player(
        null,
        playerData.firstName,
        playerData.lastName,
        playerData.email,
        playerData.handicapIndex
      );
      const playerEntity = new PlayerEntity(
        null,
        player.firstName,
        player.lastName,
        player.email,
        player.handicapIndex
      );

      PlayerRepository.addPlayer(playerEntity, (err, id) => {
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
    try {
      const player = new Player(
        id,
        playerData.firstName,
        playerData.lastName,
        playerData.email,
        playerData.handicapIndex
      );
      const playerEntity = new PlayerEntity(
        id,
        player.firstName,
        player.lastName,
        player.email,
        player.handicapIndex
      );

      PlayerRepository.updatePlayer(id, playerEntity, (err, changes) => {
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
