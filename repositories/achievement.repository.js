// Location: repositories/achievement.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for Achievement operations
class AchievementRepository extends BaseRepository {
  constructor() {
    super(db, 'achievement'); // Assuming the table name is 'achievement'
  }

  addAchievement(achievement, callback) {
    const columns = ['playerID', 'achievementDescription', 'dateAchieved'];
    const data = [achievement.playerID, achievement.achievementDescription, achievement.dateAchieved];
    super.add(data, columns, callback);
  }

  getAllAchievements(callback) {
    super.getAll(callback);
  }

  getAchievementById(id, callback) {
    super.getById(id, callback);
  }

  updateAchievement(id, achievement, callback) {
    const columns = ['playerID', 'achievementDescription', 'dateAchieved'];
    const data = [achievement.playerID, achievement.achievementDescription, achievement.dateAchieved];
    super.update(id, data, columns, callback);
  }

  deleteAchievement(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new AchievementRepository();
