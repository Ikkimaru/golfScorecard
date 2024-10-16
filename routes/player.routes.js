// Location: routes/player.routes.js

const express = require('express');
const router = express.Router();
const PlayerService = require('../services/player.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new player
router.post('/', (req, res) => {
  PlayerService.addPlayer(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add player', null, err.message);
    } else {
      sendResponse(res, 201, 'Player added successfully', { id });
    }
  });
});

// Get all players
router.get('/', (req, res) => {
  PlayerService.getAllPlayers((err, players) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve players', null, err.message);
    } else {
      sendResponse(res, 200, 'Players retrieved successfully', players);
    }
  });
});

// Get player by ID
router.get('/:id', (req, res) => {
  PlayerService.getPlayerById(req.params.id, (err, player) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve player', null, err.message);
    } else if (!player) {
      sendResponse(res, 404, `Player with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Player retrieved successfully', player);
    }
  });
});

// Update player by ID
router.put('/:id', (req, res) => {
  PlayerService.updatePlayer(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update player', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Player with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Player updated successfully', changes);
    }
  });
});

// Delete player by ID
router.delete('/:id', (req, res) => {
  PlayerService.deletePlayer(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete player', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Player with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Player deleted successfully', changes);
    }
  });
});

module.exports = router;
