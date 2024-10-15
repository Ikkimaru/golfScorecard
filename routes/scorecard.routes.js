// Location: routes/scorecard.routes.js

const express = require('express');
const router = express.Router();
const ScorecardService = require('../services/scorecard.service');
const Scorecard = require('../models/scorecard.model');

// Create - Add a new scorecard
router.post('/', (req, res) => {
  const { player_name, golf_course, game_type, scores } = req.body;

  if (!Array.isArray(scores)) {
    return res.status(400).json({ error: 'Scores must be an array of integers.' });
  }

  const maxHoles = game_type === '9-hole' ? 9 : 18;
  if (scores.length !== maxHoles) {
    return res.status(400).json({ error: `For a ${game_type}, you must provide ${maxHoles} scores.` });
  }

  const scorecard = new Scorecard(null, player_name, golf_course, game_type, scores);

  ScorecardService.addScorecard(scorecard, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
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
    rows.forEach(row => row.scores = JSON.parse(row.scores)); // Convert scores back to array
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
    row.scores = JSON.parse(row.scores); // Convert scores back to array
    res.status(200).json(row);
  });
});

// Update - Update a scorecard by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { player_name, golf_course, game_type, scores } = req.body;

  if (!Array.isArray(scores)) {
    return res.status(400).json({ error: 'Scores must be an array of integers.' });
  }

  const maxHoles = game_type === '9-hole' ? 9 : 18;
  if (scores.length !== maxHoles) {
    return res.status(400).json({ error: `For a ${game_type}, you must provide ${maxHoles} scores.` });
  }

  const scorecard = new Scorecard(id, player_name, golf_course, game_type, scores);

  ScorecardService.updateScorecard(id, scorecard, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
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

