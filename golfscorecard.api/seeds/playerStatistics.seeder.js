// Location: seeds/playerStatistics.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedPlayerStatistics = () => {
  const statistics = [
    { playerID: 1, totalGamesPlayed: 10, averageScore: 80.5, bestScore: 75 },
    { playerID: 2, totalGamesPlayed: 5, averageScore: 78.0, bestScore: 72 },
  ];

  const insertStatisticsQuery = `
    INSERT INTO PlayerStatistics (PlayerID, TotalGamesPlayed, AverageScore, BestScore)
    VALUES (?, ?, ?, ?);
  `;

  statistics.forEach(stat => {
    db.run(insertStatisticsQuery, [stat.playerID, stat.totalGamesPlayed, stat.averageScore, stat.bestScore], (err) => {
      if (err) {
        console.error(`Error seeding statistics for player ID ${stat.playerID}:`, err.message);
      } else {
        console.log(`Seeded statistics for player ID: ${stat.playerID}`);
      }
    });
  });
};

module.exports = seedPlayerStatistics;
