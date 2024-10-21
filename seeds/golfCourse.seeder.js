// Location: seeds/golfCourse.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedGolfCourses = () => {
  const golfCourses = [
    { courseName: 'Sunnydale Golf Course', location: 'California', totalHoles: 18 },
    { courseName: 'Green Valley Golf Club', location: 'Texas', totalHoles: 9 },
    { courseName: 'Mountain Ridge Golf Course', location: 'Colorado', totalHoles: 18 },
  ];

  const insertGolfCourseQuery = `
    INSERT INTO GolfCourse (CourseName, Location, TotalHoles)
    VALUES (?, ?, ?);
  `;

  golfCourses.forEach(course => {
    db.run(insertGolfCourseQuery, [course.courseName, course.location, course.totalHoles], (err) => {
      if (err) {
        console.error(`Error seeding golf course ${course.courseName}:`, err.message);
      } else {
        console.log(`Seeded golf course: ${course.courseName}`);
      }
    });
  });
};

module.exports = seedGolfCourses;
