// Location: routes/score.routes.js

const express = require('express');
const router = express.Router();
const ScoreService = require('../services/score.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new score
router.post('/', (req, res) => {
  ScoreService.addScore(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add score', null, err.message);
    } else {
      sendResponse(res, 201, 'Score added successfully', { id });
    }
  });
});

// Get all scores
router.get('/', (req, res) => {
  ScoreService.getAllScores((err, scores) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve scores', null, err.message);
    } else {
      sendResponse(res, 200, 'Scores retrieved successfully', scores);
    }
  });
});

// Get score by ID
router.get('/:id', (req, res) => {
  ScoreService.getScoreById(req.params.id, (err, score) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve score', null, err.message);
    } else if (!score) {
      sendResponse(res, 404, `Score with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Score retrieved successfully', score);
    }
  });
});

// Update score by ID
router.put('/:id', (req, res) => {
  ScoreService.updateScore(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update score', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Score with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Score updated successfully', changes);
    }
  });
});

// Delete score by ID
router.delete('/:id', (req, res) => {
  ScoreService.deleteScore(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete score', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Score with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Score deleted successfully', changes);
    }
  });
});

module.exports = router;
