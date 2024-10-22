// Location: seeds/hole.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedHoles = () => {
  const holes = [
    { golfCourseID: 1, teeBoxID: 1, holeNumber: 1, par: 4, handicapStroke: 2, yardage: 400, meters: 365 },
    { golfCourseID: 1, teeBoxID: 1, holeNumber: 2, par: 3, handicapStroke: 5, yardage: 150, meters: 137 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 1, par: 4, handicapStroke: 3, yardage: 350, meters: 320 },
  ];

  const insertHoleQuery = `
    INSERT INTO Hole (GolfCourseID, TeeBoxID, HoleNumber, Par, HandicapStroke, Yardage, Meters)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  holes.forEach(hole => {
    db.run(insertHoleQuery, [hole.golfCourseID, hole.teeBoxID, hole.holeNumber, hole.par, hole.handicapStroke, hole.yardage, hole.meters], (err) => {
      if (err) {
        console.error(`Error seeding hole ${hole.holeNumber}:`, err.message);
      } else {
        console.log(`Seeded hole: ${hole.holeNumber}`);
      }
    });
  });
};

module.exports = seedHoles;
