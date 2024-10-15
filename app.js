// Location: app.js

const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./databaseManagement'); // Import database initialization
const scorecardRoutes = require('./routes/scorecard.routes'); // Import routes

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the database (SRP - Single Responsibility)
initializeDatabase();

// Use scorecard routes (DIP - Dependency Inversion Principle)
app.use('/scorecards', scorecardRoutes);

// Start the server (SRP - Server logic is encapsulated)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
