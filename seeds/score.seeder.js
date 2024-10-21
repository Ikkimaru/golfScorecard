// Location: seeds/score.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedScores = () => {
  const scores = [
    { scorecardID: 1, holeID: 1, strokes: 4 },
    { scorecardID: 1, holeID: 2, strokes: 3 },
    { scorecardID: 2, holeID: 1, strokes: 4 },
  ];

  const insertScoreQuery = `
    INSERT INTO Score (ScorecardID, HoleID, Strokes)
    VALUES (?, ?, ?);
  `;

  scores.forEach(score => {
    db.run(insertScoreQuery, [score.scorecardID, score.holeID, score.strokes], (err) => {
      if (err) {
        console.error(`Error seeding score for scorecard ID ${score.scorecardID}:`, err.message);
      } else {
        console.log(`Seeded score for scorecard ID: ${score.scorecardID}`);
      }
    });
  });
};

module.exports = seedScores;
