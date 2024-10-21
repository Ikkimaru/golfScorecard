// Location: services/achievement.service.js

const AchievementRepository = require("../repositories/achievement.repository");
const Achievement = require("../models/achievement.model"); // Assuming you have an Achievement model
const AchievementEntity = require("../database/entities/achievementEntity"); // Assuming you have an AchievementEntity

class AchievementService {
  static addAchievement(achievementData, callback) {
    try {
      const achievement = new Achievement(
        null,
        achievementData.playerID,
        achievementData.achievementDescription,
        achievementData.dateAchieved
      );
      const achievementEntity = new AchievementEntity(
        null,
        achievement.playerID,
        achievement.achievementDescription,
        achievement.dateAchieved
      );

      AchievementRepository.addAchievement(achievementEntity, (err, id) => {
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

  static getAllAchievements(callback) {
    AchievementRepository.getAllAchievements((err, achievements) => {
      if (err) {
        callback(err);
      } else {
        callback(null, achievements);
      }
    });
  }

  static getAchievementById(id, callback) {
    AchievementRepository.getAchievementById(id, (err, achievement) => {
      if (err) {
        callback(err);
      } else {
        callback(null, achievement);
      }
    });
  }

  static updateAchievement(id, achievementData, callback) {
    try {
      const achievement = new Achievement(
        id,
        achievementData.playerID,
        achievementData.achievementDescription,
        achievementData.dateAchieved
      );
      const achievementEntity = new AchievementEntity(
        id,
        achievement.playerID,
        achievement.achievementDescription,
        achievement.dateAchieved
      );

      AchievementRepository.updateAchievement(id, achievementEntity, (err, changes) => {
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

  static deleteAchievement(id, callback) {
    AchievementRepository.deleteAchievement(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = AchievementService;
