// Location: seeds/teeBox.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedTeeBoxes = () => {
  const teeBoxes = [
    { golfCourseID: 1, color: 'Blue', yardage: 400, meters: 365, courseRating: 72.0, coursePar: 72 },
    { golfCourseID: 2, color: 'White', yardage: 300, meters: 274, courseRating: 68.0, coursePar: 36 },
  ];

  const insertTeeBoxQuery = `
    INSERT INTO TeeBox (GolfCourseID, Color, Yardage, Meters, CourseRating, CoursePar)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  teeBoxes.forEach(teeBox => {
    db.run(insertTeeBoxQuery, [teeBox.golfCourseID, teeBox.color, teeBox.yardage, teeBox.meters, teeBox.courseRating, teeBox.coursePar], (err) => {
      if (err) {
        console.error(`Error seeding tee box for golf course ID ${teeBox.golfCourseID}:`, err.message);
      } else {
        console.log(`Seeded tee box for golf course ID: ${teeBox.golfCourseID}`);
      }
    });
  });
};

module.exports = seedTeeBoxes;
