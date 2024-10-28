// Location: services/groupgame.service.js

const GroupGameRepository = require("../repositories/groupgame.repository");
const GroupGame = require("../models/groupgame.model");
const GroupGameEntity = require("../database/entities/groupgameEntity");

class GroupgameService {
    static addGroupGame(groupGameData, callback) {
        try {
            const groupGame = new GroupGame(
                null,
                groupGameData.scorecardAID,
                groupGameData.scorecardBID,
                groupGameData.scorecardCID,
                groupGameData.scorecardDID,
                groupGameData.golfCourseID
            );
            const groupGameEntity = new GroupGameEntity(
                null,
                groupGame.scorecardAID,
                groupGame.scorecardBID,
                groupGame.scorecardCID,
                groupGame.scorecardDID,
                groupGame.golfCourseID
            );

            GroupGameRepository.addGroupGame(groupGameEntity, (err, id) => {
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

    static getAllGroupGames(callback) {
        GroupGameRepository.getAllGroupGames((err, groupGames) => {
            if (err) {
                callback(err);
            } else {
                callback(null, groupGames);
            }
        });
    }

    static getGroupGameById(id, callback) {
        GroupGameRepository.getGroupGameById(id, (err, groupGame) => {
            if (err) {
                callback(err);
            } else {
                callback(null, groupGame);
            }
        });
    }

    static updateGroupGame(id, groupGameData, callback) {
        try {
            const groupGame = new GroupGame(
                id,
                groupGameData.scorecardAID,
                groupGameData.scorecardBID,
                groupGameData.scorecardCID,
                groupGameData.scorecardDID,
                groupGameData.golfCourseID
            );
            const groupGameEntity = new GroupGameEntity(
                id,
                groupGame.scorecardAID,
                groupGame.scorecardBID,
                groupGame.scorecardCID,
                groupGame.scorecardDID,
                groupGame.golfCourseID
            );

            GroupGameRepository.updateGroupGame(id, groupGameEntity, (err, changes) => {
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

    static deleteGroupGame(id, callback) {
        GroupGameRepository.deleteGroupGame(id, (err, changes) => {
            if (err) {
                callback(err);
            } else {
                callback(null, changes);
            }
        });
    }
}

module.exports = GroupgameService;
