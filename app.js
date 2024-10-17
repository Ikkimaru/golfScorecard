// Location: app.js

const express = require('express');
const bodyParser = require('body-parser');
const { initializeDatabase } = require('./database/databaseManagement');
const routes = require('./routes/routeIndex'); // Import the routes from routeIndex.js

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the database
initializeDatabase();

// Use all routes
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
