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
    PlayerID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT NOT NULL,
    HandicapIndex REAL
  `;

  db.run(`CREATE TABLE IF NOT EXISTS Player (${schema})`, (err) => {
    if (err) {
      console.error("Error creating Player table:", err.message);
    } else {
      console.log('Player table is ready.');
    }
  });
}

// Create the 'golfcourse' table if it doesn't exist
function createGolfCourseTable() {
  const schema = `
    GolfCourseID INTEGER PRIMARY KEY AUTOINCREMENT,
    CourseName TEXT NOT NULL,
    Location TEXT NOT NULL,
    TotalHoles INTEGER NOT NULL
  `;

  db.run(`CREATE TABLE IF NOT EXISTS GolfCourse (${schema})`, (err) => {
    if (err) {
      console.error("Error creating GolfCourse table:", err.message);
    } else {
      console.log('GolfCourse table is ready.');
    }
  });
}

// Create the 'hole' table if it doesn't exist
function createHoleTable() {
  const schema = `
    HoleID INTEGER PRIMARY KEY AUTOINCREMENT,
    GolfCourseID INTEGER NOT NULL,
    TeeBoxID INTEGER NOT NULL,
    HoleNumber INTEGER NOT NULL,
    Par INTEGER NOT NULL,
    Yardage INTEGER,
    Meters INTEGER,
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(GolfCourseID),
    FOREIGN KEY (TeeBoxID) REFERENCES TeeBox(TeeBoxID)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS Hole (${schema})`, (err) => {
    if (err) {
      console.error("Error creating Hole table:", err.message);
    } else {
      console.log('Hole table is ready.');
    }
  });
}

// Create the 'scorecard' table if it doesn't exist
function createScorecardTable() {
  const schema = `
    ScorecardID INTEGER PRIMARY KEY AUTOINCREMENT,
    PlayerID INTEGER NOT NULL,
    GolfCourseID INTEGER NOT NULL,
    TeeBoxID INTEGER NOT NULL,
    WeatherID INTEGER,
    GameDate DATE NOT NULL,
    TotalScore INTEGER,
    HandicapIndex REAL,
    CourseHandicap REAL,
    PlayingHandicap REAL,
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID) ON DELETE CASCADE,
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(GolfCourseID),
    FOREIGN KEY (TeeBoxID) REFERENCES TeeBox(TeeBoxID),
    FOREIGN KEY (WeatherID) REFERENCES WeatherConditions(WeatherID)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS Scorecard (${schema})`, (err) => {
    if (err) {
      console.error("Error creating Scorecard table:", err.message);
    } else {
      console.log('Scorecard table is ready.');
    }
  });
}

// Create the 'score' table if it doesn't exist
function createScoreTable() {
  const schema = `
    ScoreID INTEGER PRIMARY KEY AUTOINCREMENT,
    ScorecardID INTEGER NOT NULL,
    HoleID INTEGER NOT NULL,
    Strokes INTEGER NOT NULL,
    FOREIGN KEY (ScorecardID) REFERENCES Scorecard(ScorecardID) ON DELETE CASCADE,
    FOREIGN KEY (HoleID) REFERENCES Hole(HoleID)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS Score (${schema})`, (err) => {
    if (err) {
      console.error("Error creating Score table:", err.message);
    } else {
      console.log('Score table is ready.');
    }
  });
}

// Create the 'teeBox' table if it doesn't exist
function createTeeBoxTable() {
  const schema = `
    TeeBoxID INTEGER PRIMARY KEY AUTOINCREMENT,
    GolfCourseID INTEGER NOT NULL,
    Color TEXT NOT NULL,
    Yardage INTEGER,
    Meters INTEGER,
    CourseRating REAL,
    CoursePar INTEGER NOT NULL,
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(GolfCourseID)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS TeeBox (${schema})`, (err) => {
    if (err) {
      console.error("Error creating TeeBox table:", err.message);
    } else {
      console.log('TeeBox table is ready.');
    }
  });
}

// Create the 'weatherConditions' table if it doesn't exist
function createWeatherConditionsTable() {
  const schema = `
    WeatherID INTEGER PRIMARY KEY AUTOINCREMENT,
    Temperature REAL,
    WindSpeed REAL,
    WeatherDescription TEXT,
    ChanceOfPercipitation REAL,
    PercipitationAmount REAL,
    Date DATE NOT NULL
  `;

  db.run(`CREATE TABLE IF NOT EXISTS WeatherConditions (${schema})`, (err) => {
    if (err) {
      console.error("Error creating WeatherConditions table:", err.message);
    } else {
      console.log('WeatherConditions table is ready.');
    }
  });
}

// Create the 'achievement' table if it doesn't exist
function createAchievementTable() {
  const schema = `
    AchievementID INTEGER PRIMARY KEY AUTOINCREMENT,
    PlayerID INTEGER NOT NULL,
    AchievementDescription TEXT NOT NULL,
    DateAchieved DATE,
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS Achievement (${schema})`, (err) => {
    if (err) {
      console.error("Error creating Achievement table:", err.message);
    } else {
      console.log('Achievement table is ready.');
    }
  });
}

// Create the 'playerStatistics' table if it doesn't exist
function createPlayerStatisticsTable() {
  const schema = `
    PlayerStatisticsID INTEGER PRIMARY KEY AUTOINCREMENT,
    PlayerID INTEGER NOT NULL,
    TotalGamesPlayed INTEGER DEFAULT 0,
    AverageScore REAL,
    BestScore INTEGER,
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS PlayerStatistics (${schema})`, (err) => {
    if (err) {
      console.error("Error creating PlayerStatistics table:", err.message);
    } else {
      console.log('PlayerStatistics table is ready.');
    }
  });
}

// Initialize database tables
function initializeDatabase() {
  createPlayerTable(); //Done
  createGolfCourseTable(); //Done
  createHoleTable(); //Done
  createTeeBoxTable(); //Done
  createScorecardTable(); //Done
  createScoreTable();
  createWeatherConditionsTable();
  createAchievementTable();
  createPlayerStatisticsTable();
}

module.exports = {
  db,
  initializeDatabase,
};
