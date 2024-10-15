// Location: app.js

const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./database/databaseManagement'); // Import database initialization
const scorecardRoutes = require('./routes/scorecard.routes'); // Import scorecard routes
const playerRoutes = require('./routes/player.routes'); // Import player routes

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the database
initializeDatabase();

// Use scorecard and player routes
app.use('/scorecards', scorecardRoutes);
app.use('/players', playerRoutes); // Register player routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
