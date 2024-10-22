// Location: routes/achievement.routes.js

const express = require('express');
const router = express.Router();
const AchievementService = require('../services/achievement.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new achievement
router.post('/', (req, res) => {
  AchievementService.addAchievement(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add achievement', null, err.message);
    } else {
      sendResponse(res, 201, 'Achievement added successfully', { id });
    }
  });
});

// Get all achievements
router.get('/', (req, res) => {
  AchievementService.getAllAchievements((err, achievements) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve achievements', null, err.message);
    } else {
      sendResponse(res, 200, 'Achievements retrieved successfully', achievements);
    }
  });
});

// Get achievement by ID
router.get('/:id', (req, res) => {
  AchievementService.getAchievementById(req.params.id, (err, achievement) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve achievement', null, err.message);
    } else if (!achievement) {
      sendResponse(res, 404, `Achievement with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Achievement retrieved successfully', achievement);
    }
  });
});

// Update achievement by ID
router.put('/:id', (req, res) => {
  AchievementService.updateAchievement(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update achievement', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Achievement with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Achievement updated successfully', changes);
    }
  });
});

// Delete achievement by ID
router.delete('/:id', (req, res) => {
  AchievementService.deleteAchievement(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete achievement', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Achievement with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Achievement deleted successfully', changes);
    }
  });
});

module.exports = router;
