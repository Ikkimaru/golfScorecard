// Location: routes/routeIndex.js

const express = require('express');
const scorecardRoutes = require('./scorecard.routes');
const playerRoutes = require('./player.routes');
const golfCourseRoutes = require('./golfcourse.routes');
const holeRoutes = require('./hole.routes');
const teeBoxRoutes = require('./teeBox.routes');

// Initialize router
const router = express.Router();

// Mount route handlers
router.use('/scorecards', scorecardRoutes);
router.use('/players', playerRoutes);
router.use('/golfcourses', golfCourseRoutes);
router.use('/holes', holeRoutes);
router.use('/teeboxes', teeBoxRoutes);

module.exports = router;
