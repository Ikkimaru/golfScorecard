// Location: seeds/scorecard.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedScorecards = () => {
  const scorecards = [
    { playerID: 1, golfCourseID: 1, teeBoxID: 1, weatherID: 1, gameDate: '2023-10-01', totalScore: 85, handicapIndex: 10.5, courseHandicap: 12, playingHandicap: 10 },
    { playerID: 1, golfCourseID: 2, teeBoxID: 1, weatherID: 2, gameDate: '2023-10-05', totalScore: 78, handicapIndex: 99, courseHandicap: 12, playingHandicap: 10 },
    { playerID: 2, golfCourseID: 1, teeBoxID: 2, weatherID: 1, gameDate: '2023-10-02', totalScore: 75, handicapIndex: 12.3, courseHandicap: 14, playingHandicap: 12 },
    { playerID: 2, golfCourseID: 3, teeBoxID: 2, weatherID: 3, gameDate: '2023-10-06', totalScore: 80, handicapIndex: 12.3, courseHandicap: 14, playingHandicap: 12 },
    { playerID: 3, golfCourseID: 2, teeBoxID: 3, weatherID: 2, gameDate: '2023-10-03', totalScore: 90, handicapIndex: 15.0, courseHandicap: 16, playingHandicap: 14 },
    { playerID: 3, golfCourseID: 3, teeBoxID: 3, weatherID: 3, gameDate: '2023-10-07', totalScore: 88, handicapIndex: 15.0, courseHandicap: 16, playingHandicap: 14 },
  ];

  const insertScorecardQuery = `
    INSERT INTO Scorecard (PlayerID, GolfCourseID, TeeBoxID, WeatherID, GameDate, TotalScore, HandicapIndex, CourseHandicap, PlayingHandicap)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  scorecards.forEach(scorecard => {
    db.run(insertScorecardQuery, [
      scorecard.playerID,
      scorecard.golfCourseID,
      scorecard.teeBoxID,
      scorecard.weatherID,
      scorecard.gameDate,
      scorecard.totalScore,
      scorecard.handicapIndex,
      scorecard.courseHandicap,
      scorecard.playingHandicap
    ], (err) => {
      if (err) {
        console.error(`Error seeding scorecard for player ID ${scorecard.playerID}:`, err.message);
      } else {
        console.log(`Seeded scorecard for player ID: ${scorecard.playerID}`);
      }
    });
  });
};

module.exports = seedScorecards;
