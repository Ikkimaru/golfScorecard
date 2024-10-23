// Location: seeds/scorecard.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedScorecards = () => {
  const scorecards = [
    { playerID: 1, golfCourseID: 1, teeBoxID: 1, weatherID: 1, gameDate: '2023-10-01', totalScore: 85, handicapIndex: 10.5 }, // Get handicapIndex from playerID, Add CourseHandicap and PlayingHandicap
    { playerID: 2, golfCourseID: 2, teeBoxID: 1, weatherID: 2, gameDate: '2023-10-02', totalScore: 75, handicapIndex: 12.3 },
  ];

  const insertScorecardQuery = `
    INSERT INTO Scorecard (PlayerID, GolfCourseID, TeeBoxID, WeatherID, GameDate, TotalScore, HandicapIndex)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  scorecards.forEach(scorecard => {
    db.run(insertScorecardQuery, [scorecard.playerID, scorecard.golfCourseID, scorecard.teeBoxID, scorecard.weatherID, scorecard.gameDate, scorecard.totalScore, scorecard.handicapIndex], (err) => {
      if (err) {
        console.error(`Error seeding scorecard for player ID ${scorecard.playerID}:`, err.message);
      } else {
        console.log(`Seeded scorecard for player ID: ${scorecard.playerID}`);
      }
    });
  });
};

module.exports = seedScorecards;
