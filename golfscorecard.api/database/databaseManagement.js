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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    GolfCourseID INTEGER NOT NULL,
    TeeBoxID INTEGER NOT NULL,
    HoleNumber INTEGER NOT NULL,
    Par INTEGER NOT NULL,
    HandicapStroke INTEGER NOT NULL,
    Yardage INTEGER,
    Meters INTEGER,
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(id),
    FOREIGN KEY (TeeBoxID) REFERENCES TeeBox(id)
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    PlayerID INTEGER NOT NULL,
    GolfCourseID INTEGER NOT NULL,
    TeeBoxID INTEGER NOT NULL,
    WeatherID INTEGER,
    GameDate DATE NOT NULL,
    TotalScore INTEGER,
    HandicapIndex REAL,
    CourseHandicap REAL,
    PlayingHandicap REAL,
    FOREIGN KEY (PlayerID) REFERENCES Player(id) ON DELETE CASCADE,
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(id),
    FOREIGN KEY (TeeBoxID) REFERENCES TeeBox(id),
    FOREIGN KEY (WeatherID) REFERENCES WeatherConditions(id)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS Scorecard (${schema})`, (err) => {
    if (err) {
      console.error("Error creating Scorecard table:", err.message);
    } else {
      console.log('Scorecard table is ready.');
    }
  });
}

// Create the 'scorecard' table if it doesn't exist
function createGroupGameTable() {
  const schema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ScorecardAID INTEGER NOT NULL,
    ScorecardBID INTEGER NOT NULL,
    ScorecardCID INTEGER NOT NULL,
    ScorecardDID INTEGER NOT NULL,
    GolfCourseID INTEGER NOT NULL,
    FOREIGN KEY (ScorecardAID) REFERENCES Scorecard(id),
    FOREIGN KEY (ScorecardBID) REFERENCES Scorecard(id),
    FOREIGN KEY (ScorecardCID) REFERENCES Scorecard(id),
    FOREIGN KEY (ScorecardDID) REFERENCES Scorecard(id),
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(id)
  `;

  db.run(`CREATE TABLE IF NOT EXISTS GroupGame (${schema})`, (err) => {
    if (err) {
      console.error("Error creating GroupGame table:", err.message);
    } else {
      console.log('Groupgame table is ready.');
    }
  });
}

// Create the 'score' table if it doesn't exist
function createScoreTable() {
  const schema = `
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    scorecardID INTEGER NOT NULL,
    HoleID INTEGER NOT NULL,
    Strokes INTEGER NOT NULL,
    FOREIGN KEY (ScorecardID) REFERENCES Scorecard(id) ON DELETE CASCADE,
    FOREIGN KEY (HoleID) REFERENCES Hole(id)
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    GolfCourseID INTEGER NOT NULL,
    Color TEXT NOT NULL,
    Yardage INTEGER,
    Meters INTEGER,
    CourseRating REAL,
    CoursePar INTEGER NOT NULL,
    FOREIGN KEY (GolfCourseID) REFERENCES GolfCourse(id)
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    Temperature REAL,
    WindSpeed REAL,
    WeatherDescription TEXT,
    ChanceOfPrecipitation REAL,
    PrecipitationAmount REAL,
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    PlayerID INTEGER NOT NULL,
    AchievementDescription TEXT NOT NULL,
    DateAchieved DATE,
    FOREIGN KEY (PlayerID) REFERENCES Player(id)
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    PlayerID INTEGER NOT NULL,
    TotalGamesPlayed INTEGER DEFAULT 0,
    AverageScore REAL,
    BestScore INTEGER,
    FOREIGN KEY (PlayerID) REFERENCES Player(id)
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
  createPlayerTable();
  createGolfCourseTable();
  createHoleTable();
  createTeeBoxTable();
  createScorecardTable();
  createScoreTable();
  createWeatherConditionsTable();
  createAchievementTable();
  createPlayerStatisticsTable();
  createGroupGameTable();
}

module.exports = {
  db,
  initializeDatabase,
};
