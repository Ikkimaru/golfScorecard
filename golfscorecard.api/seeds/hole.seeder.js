// Location: seeds/hole.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedHoles = () => {
  const holes = [
    { golfCourseID: 1, teeBoxID: 1, holeNumber: 1, par: 4, handicapStroke: 2, yardage: 400, meters: 365 },
    { golfCourseID: 3, teeBoxID: 1, holeNumber: 2, par: 3, handicapStroke: 5, yardage: 150, meters: 137 },
    { golfCourseID: 3, teeBoxID: 1, holeNumber: 1, par: 4, handicapStroke: 3, yardage: 350, meters: 320 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 1, par: 4, handicapStroke: 5, yardage: 429, meters: 393 }, //Course Green Valley Golf Club
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 2, par: 4, handicapStroke: 7, yardage: 392, meters: 359 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 3, par: 4, handicapStroke: 15, yardage: 309, meters: 283 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 4, par: 3, handicapStroke: 11, yardage: 160, meters: 147 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 5, par: 4, handicapStroke: 3, yardage: 345, meters: 316 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 6, par: 3, handicapStroke: 13, yardage: 152, meters: 139 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 7, par: 5, handicapStroke: 9, yardage: 489, meters: 448 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 8, par: 5, handicapStroke: 17, yardage: 493, meters: 451 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 9, par: 4, handicapStroke: 1, yardage: 438, meters: 401 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 10, par: 4, handicapStroke: 12, yardage: 378, meters: 346 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 11, par: 4, handicapStroke: 4, yardage: 404, meters: 370 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 12, par: 4, handicapStroke: 14, yardage: 326, meters: 299 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 13, par: 3, handicapStroke: 10, yardage: 177, meters: 162 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 14, par: 4, handicapStroke: 2, yardage: 345, meters: 316 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 15, par: 3, handicapStroke: 18, yardage: 132, meters: 121 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 16, par: 5, handicapStroke: 8, yardage: 501, meters: 459 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 17, par: 5, handicapStroke: 16, yardage: 511, meters: 468 },
    { golfCourseID: 2, teeBoxID: 1, holeNumber: 18, par: 4, handicapStroke: 6, yardage: 428, meters: 392 }
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
