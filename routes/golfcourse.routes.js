// Location: routes/golfcourse.routes.js

const express = require('express');
const router = express.Router();
const GolfCourseService = require('../services/golfcourse.service');

// Add a new golf course
router.post('/', (req, res) => {
  GolfCourseService.addGolfCourse(req.body, (err, id) => {
    if (err) {
      res.status(500).send({ error: 'Failed to add golf course' });
    } else {
      res.status(201).send({ id });
    }
  });
});

// Get all golf courses
router.get('/', (req, res) => {
  GolfCourseService.getAllGolfCourses((err, golfCourses) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve golf courses' });
    } else {
      res.send(golfCourses);
    }
  });
});

// Get golf course by ID
router.get('/:id', (req, res) => {
  GolfCourseService.getGolfCourseById(req.params.id, (err, golfCourse) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve golf course' });
    } else {
      res.send(golfCourse);
    }
  });
});

// Update golf course by ID
router.put('/:id', (req, res) => {
  GolfCourseService.updateGolfCourse(req.params.id, req.body, (err, changes) => {
    if (err) {
      res.status(500).send({ error: 'Failed to update golf course' });
    } else {
      res.send({ changes });
    }
  });
});

// Delete golf course by ID
router.delete('/:id', (req, res) => {
  GolfCourseService.deleteGolfCourse(req.params.id, (err, changes) => {
    if (err) {
      res.status(500).send({ error: 'Failed to delete golf course' });
    } else {
      res.send({ changes });
    }
  });
});

module.exports = router;
