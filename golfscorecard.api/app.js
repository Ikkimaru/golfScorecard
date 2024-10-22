// Location: app.js
// node app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDatabase } = require('./database/databaseManagement');
const routes = require('./routes/routeIndex');
const seedRoutes = require('./routes/seed.routes');

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200'
}));
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
