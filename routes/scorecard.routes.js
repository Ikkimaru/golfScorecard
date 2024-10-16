// Location: routes/scorecard.routes.js

const express = require('express');
const router = express.Router();
const ScorecardService = require('../services/scorecard.service');
const { sendResponse } = require('./utils/responseUtil');

// Create - Add a new scorecard
router.post('/', (req, res) => {
  ScorecardService.addScorecard(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 400, 'Failed to add scorecard', null, err.message);
    } else {
      sendResponse(res, 201, 'Scorecard added successfully', { id });
    }
  });
});

// Read - Get all scorecards
router.get('/', (req, res) => {
  ScorecardService.getAllScorecards((err, rows) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve scorecards', null, err.message);
    } else {
      sendResponse(res, 200, 'Scorecards retrieved successfully', rows);
    }
  });
});

// Read - Get a scorecard by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  ScorecardService.getScorecardById(id, (err, row) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve scorecard', null, err.message);
    } else if (!row) {
      sendResponse(res, 404, `Scorecard with ID ${id} not found`);
    } else {
      sendResponse(res, 200, 'Scorecard retrieved successfully', row);
    }
  });
});

// Update - Update a scorecard by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  ScorecardService.updateScorecard(id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 400, 'Failed to update scorecard', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Scorecard with ID ${id} not found`);
    } else {
      sendResponse(res, 200, 'Scorecard updated successfully', changes);
    }
  });
});

// Delete - Delete a scorecard by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  ScorecardService.deleteScorecard(id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete scorecard', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Scorecard with ID ${id} not found`);
    } else {
      sendResponse(res, 200, 'Scorecard deleted successfully', changes);
    }
  });
});

module.exports = router;
