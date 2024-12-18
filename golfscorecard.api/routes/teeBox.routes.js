// Location: routes/teeBox.routes.js

const express = require('express');
const router = express.Router();
const TeeBoxService = require('../services/teeBox.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new tee box
router.post('/', (req, res) => {
  TeeBoxService.addTeeBox(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add tee box', null, err.message);
    } else {
      sendResponse(res, 201, 'Tee box added successfully', { id });
    }
  });
});

// Get all tee boxes
router.get('/:id', (req, res) => {
  TeeBoxService.getAllTeeBoxes((err, teeBoxes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve tee boxes', null, err.message);
    } else {
      sendResponse(res, 200, 'Tee boxes retrieved successfully', teeBoxes);
    }
  });
});

// Get tee box by ID
router.get('/:id', (req, res) => {
  TeeBoxService.getTeeBoxById(req.params.id, (err, teeBox) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve tee box', null, err.message);
    } else if (!teeBox) {
      sendResponse(res, 404, `Tee box with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Tee box retrieved successfully', teeBox);
    }
  });
});

// Get tee box by Course ID
router.get('/golfCourse/:id', (req, res) => {
  TeeBoxService.getTeeBoxByCourseId(req.params.id, (err, teeBox) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve tee box by Course', null, err.message);
    } else if (!teeBox) {
      sendResponse(res, 404, `Tee box with Course ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Tee box retrieved successfully', teeBox);
    }
  });
});

// Update tee box by ID
router.put('/:id', (req, res) => {
  TeeBoxService.updateTeeBox(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update tee box', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Tee box with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Tee box updated successfully', changes);
    }
  });
});

// Delete tee box by ID
router.delete('/:id', (req, res) => {
  TeeBoxService.deleteTeeBox(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete tee box', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Tee box with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Tee box deleted successfully', changes);
    }
  });
});

module.exports = router;
