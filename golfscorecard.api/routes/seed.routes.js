// Location: routes/seed.routes.js

const express = require('express');
const router = express.Router();
const seedPlayers = require('../seeds/player.seeder');
const seedGolfCourses = require('../seeds/golfCourse.seeder');
const seedHoles = require('../seeds/hole.seeder');
const seedScorecards = require('../seeds/scorecard.seeder');
const seedScores = require('../seeds/score.seeder');
const seedTeeBoxes = require('../seeds/teeBox.seeder');
const seedWeatherConditions = require('../seeds/weatherConditions.seeder');
const seedAchievements = require('../seeds/achievement.seeder');
const seedPlayerStatistics = require('../seeds/playerStatistics.seeder');

// Route to seed all data
router.get('/seed', (req, res) => {
    try {
      seedPlayers();
      seedGolfCourses();
      seedTeeBoxes();
      seedPlayerStatistics();
      seedAchievements();
      seedWeatherConditions();
      seedHoles();
      seedScorecards();
      seedScores();
      res.status(200).send('Seeded data successfully.');
    } catch (error) {
      res.status(500).send('Error seeding data: ' + error.message);
    }
  });

// Route to seed player data
router.get('/seed/players', (req, res) => {
  try {
    seedPlayers();
    res.status(200).send('Player data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding player data: ' + error.message);
  }
});

// Route to seed golf course data
router.get('/seed/golfCourses', (req, res) => {
  try {
    seedGolfCourses();
    res.status(200).send('Golf course data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding golf course data: ' + error.message);
  }
});

// Route to seed hole data
router.get('/seed/holes', (req, res) => {
  try {
    seedHoles();
    res.status(200).send('Hole data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding hole data: ' + error.message);
  }
});

// Route to seed scorecard data
router.get('/seed/scorecards', (req, res) => {
  try {
    seedScorecards();
    res.status(200).send('Scorecard data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding scorecard data: ' + error.message);
  }
});

// Route to seed score data
router.get('/seed/scores', (req, res) => {
  try {
    seedScores();
    res.status(200).send('Score data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding score data: ' + error.message);
  }
});

// Route to seed tee box data
router.get('/seed/teeBoxes', (req, res) => {
  try {
    seedTeeBoxes();
    res.status(200).send('Tee box data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding tee box data: ' + error.message);
  }
});

// Route to seed weather conditions data
router.get('/seed/weatherConditions', (req, res) => {
  try {
    seedWeatherConditions();
    res.status(200).send('Weather conditions data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding weather conditions data: ' + error.message);
  }
});

// Route to seed achievement data
router.get('/seed/achievements', (req, res) => {
  try {
    seedAchievements();
    res.status(200).send('Achievement data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding achievement data: ' + error.message);
  }
});

// Route to seed player statistics data
router.get('/seed/playerStatistics', (req, res) => {
  try {
    seedPlayerStatistics();
    res.status(200).send('Player statistics data seeded successfully.');
  } catch (error) {
    res.status(500).send('Error seeding player statistics data: ' + error.message);
  }
});

module.exports = router;
