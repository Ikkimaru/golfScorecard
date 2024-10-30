// Location: routes/login.routes.js

const express = require('express');
const router = express.Router();
const LoginService = require('../services/login.service'); // Assuming LoginService is correctly implemented
const { sendResponse } = require('./utils/responseUtil'); // Assuming sendResponse is defined

// POST endpoint for login
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return sendResponse(res, 400, 'Username and password are required');
    }
    try {
        // Fetch user from LoginService
        LoginService.getLoginDetails({ username, password }, (err, user) => {
            if (err) {
                return sendResponse(res, 500, 'Failed to retrieve Username/Password', null, err.message);
            } else if (!user) {
                return sendResponse(res, 404, 'User not found');
            } else {
                return sendResponse(res, 200, 'User retrieved successfully', user);
            }
        });
    } catch (error) {
        return sendResponse(res, 500, 'Unexpected error occurred', null, error.message);
    }
});

module.exports = router;
