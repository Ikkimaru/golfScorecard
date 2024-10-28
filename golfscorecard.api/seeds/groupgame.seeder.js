// Location: seeds/groupgame.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedGroupGames = () => {
    const groupGames = [
        { ScorecardAID: 1, ScorecardBID: 2, ScorecardCID: 3, ScorecardDID: 4, GolfCourseID: 1},
        { ScorecardAID: 2, ScorecardBID: 3, ScorecardCID: 4, ScorecardDID: 5, GolfCourseID: 2},
        { ScorecardAID: 3, ScorecardBID: 4, ScorecardCID: 5, ScorecardDID: 6, GolfCourseID: 3},
    ];

    const insertGroupGameQuery = `
    INSERT INTO GroupGame (ScorecardAID, ScorecardBID, ScorecardCID, ScorecardDID, GolfCourseID)
    VALUES (?, ?, ?, ?, ?);
  `;

    groupGames.forEach(game => {
        db.run(insertGroupGameQuery, [game.ScorecardAID, game.ScorecardBID, game.ScorecardCID, game.ScorecardDID, game.GolfCourseID], (err) => {
            if (err) {
                console.error(`Error seeding group game on ${game.GolfCourseID}:`, err.message);
            } else {
                console.log(`Seeded group game on Course: ${game.GolfCourseID}`);
            }
        });
    });
};

module.exports = seedGroupGames;
