// Location: routes/player.routes.js

const express = require('express');
const router = express.Router();
const PlayerService = require('../services/player.service');

// Add a new player
router.post('/', (req, res) => {
  PlayerService.addPlayer(req.body, (err, id) => {
    if (err) {
      res.status(500).send({ error: 'Failed to add player' });
    } else {
      res.status(201).send({ id });
    }
  });
});

// Get all players
router.get('/', (req, res) => {
  PlayerService.getAllPlayers((err, players) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve players' });
    } else {
      res.send(players);
    }
  });
});

// Get player by ID
router.get('/:id', (req, res) => {
  PlayerService.getPlayerById(req.params.id, (err, player) => {
    if (err) {
      res.status(500).send({ error: 'Failed to retrieve player' });
    } else {
      res.send(player);
    }
  });
});

// Update player by ID
router.put('/:id', (req, res) => {
  PlayerService.updatePlayer(req.params.id, req.body, (err, changes) => {
    if (err) {
      res.status(500).send({ error: 'Failed to update player' });
    } else {
      res.send({ changes });
    }
  });
});

// Delete player by ID
router.delete('/:id', (req, res) => {
  PlayerService.deletePlayer(req.params.id, (err, changes) => {
    if (err) {
      res.status(500).send({ error: 'Failed to delete player' });
    } else {
      res.send({ changes });
    }
  });
});

module.exports = router;
