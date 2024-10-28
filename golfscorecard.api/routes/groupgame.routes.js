// Location: routes/groupgame.routes.js

const express = require('express');
const router = express.Router();
const GroupGameService = require('../services/groupgame.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new group game
router.post('/', (req, res) => {
    GroupGameService.addGroupGame(req.body, (err, id) => {
        if (err) {
            sendResponse(res, 500, 'Failed to add group game', null, err.message);
        } else {
            sendResponse(res, 201, 'Group game added successfully', { id });
        }
    });
});

// Get all group games
router.get('/', (req, res) => {
    GroupGameService.getAllGroupGames((err, groupGames) => {
        if (err) {
            sendResponse(res, 500, 'Failed to retrieve group games', null, err.message);
        } else {
            sendResponse(res, 200, 'Group games retrieved successfully', groupGames);
        }
    });
});

// Get group game by ID
router.get('/:id', (req, res) => {
    GroupGameService.getGroupGameById(req.params.id, (err, groupGame) => {
        if (err) {
            sendResponse(res, 500, 'Failed to retrieve group game', null, err.message);
        } else if (!groupGame) {
            sendResponse(res, 404, `Group game with ID ${req.params.id} not found`);
        } else {
            sendResponse(res, 200, 'Group game retrieved successfully', groupGame);
        }
    });
});

// Update group game by ID
router.put('/:id', (req, res) => {
    GroupGameService.updateGroupGame(req.params.id, req.body, (err, changes) => {
        if (err) {
            sendResponse(res, 500, 'Failed to update group game', null, err.message);
        } else if (changes === 0) {
            sendResponse(res, 404, `Group game with ID ${req.params.id} not found`);
        } else {
            sendResponse(res, 200, 'Group game updated successfully', changes);
        }
    });
});

// Delete group game by ID
router.delete('/:id', (req, res) => {
    GroupGameService.deleteGroupGame(req.params.id, (err, changes) => {
        if (err) {
            sendResponse(res, 500, 'Failed to delete group game', null, err.message);
        } else if (changes === 0) {
            sendResponse(res, 404, `Group game with ID ${req.params.id} not found`);
        } else {
            sendResponse(res, 200, 'Group game deleted successfully', changes);
        }
    });
});

module.exports = router;
