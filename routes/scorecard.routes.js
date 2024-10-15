// Location: routes/scorecard.routes.js

const express = require('express');
const router = express.Router();
const ScorecardService = require('../services/scorecard.service');

// Create - Add a new scorecard
router.post('/', (req, res) => {
  ScorecardService.addScorecard(req.body, (err, id) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id });
  });
});

// Read - Get all scorecards
router.get('/', (req, res) => {
  ScorecardService.getAllScorecards((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Read - Get a scorecard by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  ScorecardService.getScorecardById(id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Scorecard not found' });
    }
    res.status(200).json(row);
  });
});

// Update - Update a scorecard by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  ScorecardService.updateScorecard(id, req.body, (err, changes) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Scorecard not found' });
    }
    res.status(200).json({ message: 'Scorecard updated' });
  });
});

// Delete - Delete a scorecard by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  ScorecardService.deleteScorecard(id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Scorecard not found' });
    }
    res.status(200).json({ message: 'Scorecard deleted' });
  });
});

module.exports = router;
