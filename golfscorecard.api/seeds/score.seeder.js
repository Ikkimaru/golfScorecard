// Location: seeds/score.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedScores = () => {
  const scores = [
    { scorecardID: 1, holeID: 1, strokes: 4 },
    { scorecardID: 1, holeID: 2, strokes: 3 },
    { scorecardID: 2, holeID: 1, strokes: 3 },
    { scorecardID: 2, holeID: 2, strokes: 5 },
    { scorecardID: 2, holeID: 3, strokes: 6 },
    { scorecardID: 2, holeID: 4, strokes: 5 },
    { scorecardID: 2, holeID: 5, strokes: 5 },
    { scorecardID: 2, holeID: 6, strokes: 4 },
    { scorecardID: 2, holeID: 7, strokes: 7 },
    { scorecardID: 2, holeID: 8, strokes: 4 },
    { scorecardID: 2, holeID: 9, strokes: 5 },
    { scorecardID: 2, holeID: 10, strokes: 5 },
    { scorecardID: 2, holeID: 11, strokes: 5 },
    { scorecardID: 2, holeID: 12, strokes: 4 },
    { scorecardID: 2, holeID: 13, strokes: 3 },
    { scorecardID: 2, holeID: 14, strokes: 6 },
    { scorecardID: 2, holeID: 15, strokes: 3 },
    { scorecardID: 2, holeID: 16, strokes: 5 },
    { scorecardID: 2, holeID: 17, strokes: 4 },
    { scorecardID: 2, holeID: 18, strokes: 5 }
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
