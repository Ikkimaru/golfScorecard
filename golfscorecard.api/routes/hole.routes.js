// Location: routes/hole.routes.js

const express = require('express');
const router = express.Router();
const HoleService = require('../services/hole.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new hole
router.post('/', (req, res) => {
  HoleService.addHole(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add hole', null, err.message);
    } else {
      sendResponse(res, 201, 'Hole added successfully', { id });
    }
  });
});

// Get all holes
router.get('/', (req, res) => {
  HoleService.getAllHoles((err, holes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve holes', null, err.message);
    } else {
      sendResponse(res, 200, 'Holes retrieved successfully', holes);
    }
  });
});

// Get hole by ID
router.get('/:id', (req, res) => {
  HoleService.getHoleById(req.params.id, (err, hole) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve hole', null, err.message);
    } else if (!hole) {
      sendResponse(res, 404, `Hole with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Hole retrieved successfully', hole);
    }
  });
});

// Get hole by CourseId
router.get('/golfCourse/:id', (req, res) => {
  HoleService.getHoleByCourseId(req.params.id, (err, hole) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve course hole', null, err.message);
    } else if (!hole) {
      sendResponse(res, 404, `Hole with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Hole retrieved successfully', hole);
    }
  });
});

// Update hole by ID
router.put('/:id', (req, res) => {
  HoleService.updateHole(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update hole', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Hole with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Hole updated successfully', changes);
    }
  });
});

// Delete hole by ID
router.delete('/:id', (req, res) => {
  HoleService.deleteHole(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete hole', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Hole with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Hole deleted successfully', changes);
    }
  });
});

module.exports = router;
