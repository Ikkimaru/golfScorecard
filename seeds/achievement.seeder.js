// Location: seeds/achievement.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedAchievements = () => {
  const achievements = [
    { playerID: 1, description: 'First Eagle', dateAchieved: '2023-10-05' },
    { playerID: 2, description: 'Best Round', dateAchieved: '2023-10-10' },
  ];

  const insertAchievementQuery = `
    INSERT INTO Achievement (PlayerID, AchievementDescription, DateAchieved)
    VALUES (?, ?, ?);
  `;

  achievements.forEach(achievement => {
    db.run(insertAchievementQuery, [achievement.playerID, achievement.description, achievement.dateAchieved], (err) => {
      if (err) {
        console.error(`Error seeding achievement for player ID ${achievement.playerID}:`, err.message);
      } else {
        console.log(`Seeded achievement for player ID: ${achievement.playerID}`);
      }
    });
  });
};

module.exports = seedAchievements;
