// Location: databaseManagement.js

const sqlite3 = require('sqlite3').verbose();

// Database connection
const db = new sqlite3.Database('./golfScores.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the golfScores.db database.');
  }
});

// Create the 'scorecard' table if it doesn't exist
function createScorecardTable() {
  const schema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_name TEXT NOT NULL,
    golf_course TEXT NOT NULL,
    game_type TEXT CHECK( game_type IN ('9-hole', '18-hole') ) NOT NULL,
    scores TEXT NOT NULL
  `;

  db.run(`CREATE TABLE IF NOT EXISTS scorecard (${schema})`, (err) => {
    if (err) {
      console.error("Error creating scorecard table:", err.message);
    } else {
      console.log('Scorecard table is ready.');
    }
  });
}

// Initialize database tables
function initializeDatabase() {
  createScorecardTable();
}

module.exports = {
  db,
  initializeDatabase,
};
