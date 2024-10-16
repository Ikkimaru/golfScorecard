// Location: app.js

const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./database/databaseManagement');
const scorecardRoutes = require('./routes/scorecard.routes');
const playerRoutes = require('./routes/player.routes');
const golfCourseRoutes = require('./routes/golfcourse.routes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the database
initializeDatabase();

// Use scorecard, player, and golf course routes
app.use('/scorecards', scorecardRoutes);
app.use('/players', playerRoutes);
app.use('/golfcourses', golfCourseRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
