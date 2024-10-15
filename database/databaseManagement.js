// Location: database/databaseManagement.js

const sqlite3 = require('sqlite3').verbose();

// Database connection
const db = new sqlite3.Database('./database/golfScores.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the golfScores.db database.');
  }
});

// Create the 'player' table if it doesn't exist
function createPlayerTable() {
  const schema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    currentHandicap REAL
  `;

  db.run(`CREATE TABLE IF NOT EXISTS player (${schema})`, (err) => {
    if (err) {
      console.error("Error creating player table:", err.message);
    } else {
      console.log('Player table is ready.');
    }
  });
}

// Create the 'scorecard' table if it doesn't exist
function createScorecardTable() {
  const schema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    playerId INTEGER NOT NULL,
    golf_course TEXT NOT NULL,
    game_type TEXT CHECK( game_type IN ('9-hole', '18-hole') ) NOT NULL,
    scores TEXT NOT NULL,
    FOREIGN KEY (playerId) REFERENCES player(id) ON DELETE CASCADE
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
  createPlayerTable();
  createScorecardTable();
}

module.exports = {
  db,
  initializeDatabase,
};
