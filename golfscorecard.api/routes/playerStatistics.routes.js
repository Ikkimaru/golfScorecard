// Location: routes/playerStatistics.routes.js

const express = require('express');
const router = express.Router();
const PlayerStatisticsService = require('../services/playerStatistics.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new player statistics
router.post('/', (req, res) => {
  PlayerStatisticsService.addPlayerStatistics(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add player statistics', null, err.message);
    } else {
      sendResponse(res, 201, 'Player statistics added successfully', { id });
    }
  });
});

// Get all player statistics
router.get('/', (req, res) => {
  PlayerStatisticsService.getAllPlayerStatistics((err, playerStatistics) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve player statistics', null, err.message);
    } else {
      sendResponse(res, 200, 'Player statistics retrieved successfully', playerStatistics);
    }
  });
});

// Get player statistics by ID
router.get('/:id', (req, res) => {
  PlayerStatisticsService.getPlayerStatisticsById(req.params.id, (err, playerStatistics) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve player statistics', null, err.message);
    } else if (!playerStatistics) {
      sendResponse(res, 404, `Player statistics with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Player statistics retrieved successfully', playerStatistics);
    }
  });
});

// Update player statistics by ID
router.put('/:id', (req, res) => {
  PlayerStatisticsService.updatePlayerStatistics(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update player statistics', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Player statistics with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Player statistics updated successfully', changes);
    }
  });
});

// Delete player statistics by ID
router.delete('/:id', (req, res) => {
  PlayerStatisticsService.deletePlayerStatistics(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete player statistics', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Player statistics with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Player statistics deleted successfully', changes);
    }
  });
});

module.exports = router;
