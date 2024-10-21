// Location: app.js

const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./database/databaseManagement');
const routes = require('./routes/routeIndex');
const seedRoutes = require('./routes/seed.routes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the database
initializeDatabase();

// Use all routes
app.use(routes);

// Seed all tables
app.use(seedRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
