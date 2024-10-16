// Location: routes/golfcourse.routes.js

const express = require('express');
const router = express.Router();
const GolfCourseService = require('../services/golfcourse.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new golf course
router.post('/', (req, res) => {
  GolfCourseService.addGolfCourse(req.body, (err, result) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add golf course', null, err.message);
    } else {
      sendResponse(res, 201, 'Golf course added successfully', { id: result.id });
    }
  });
});

// Get all golf courses
router.get('/', (req, res) => {
  GolfCourseService.getAllGolfCourses((err, golfCourses) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve golf courses', null, err.message);
    } else {
      sendResponse(res, 200, 'Golf courses retrieved successfully', golfCourses);
    }
  });
});

// Get golf course by ID
router.get('/:id', (req, res) => {
  GolfCourseService.getGolfCourseById(req.params.id, (err, golfCourse) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve golf course', null, err.message);
    } else if (!golfCourse) {
      sendResponse(res, 404, `Golf course with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Golf course retrieved successfully', golfCourse);
    }
  });
});

// Update golf course by ID
router.put('/:id', (req, res) => {
  GolfCourseService.updateGolfCourse(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update golf course', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Golf course with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Golf course updated successfully', changes);
    }
  });
});

// Delete golf course by ID
router.delete('/:id', (req, res) => {
  GolfCourseService.deleteGolfCourse(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete golf course', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Golf course with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Golf course deleted successfully', changes);
    }
  });
});

module.exports = router;
