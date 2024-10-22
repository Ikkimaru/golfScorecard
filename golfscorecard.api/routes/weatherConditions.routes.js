// Location: routes/weatherConditions.routes.js

const express = require('express');
const router = express.Router();
const WeatherConditionsService = require('../services/weatherConditions.service');
const { sendResponse } = require('./utils/responseUtil');

// Add a new weather condition
router.post('/', (req, res) => {
  WeatherConditionsService.addWeatherConditions(req.body, (err, id) => {
    if (err) {
      sendResponse(res, 500, 'Failed to add weather condition', null, err.message);
    } else {
      sendResponse(res, 201, 'Weather condition added successfully', { id });
    }
  });
});

// Get all weather conditions
router.get('/', (req, res) => {
  WeatherConditionsService.getAllWeatherConditions((err, weatherConditions) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve weather conditions', null, err.message);
    } else {
      sendResponse(res, 200, 'Weather conditions retrieved successfully', weatherConditions);
    }
  });
});

// Get weather condition by ID
router.get('/:id', (req, res) => {
  WeatherConditionsService.getWeatherConditionsById(req.params.id, (err, weatherCondition) => {
    if (err) {
      sendResponse(res, 500, 'Failed to retrieve weather condition', null, err.message);
    } else if (!weatherCondition) {
      sendResponse(res, 404, `Weather condition with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Weather condition retrieved successfully', weatherCondition);
    }
  });
});

// Update weather condition by ID
router.put('/:id', (req, res) => {
  WeatherConditionsService.updateWeatherConditions(req.params.id, req.body, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to update weather condition', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Weather condition with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Weather condition updated successfully', changes);
    }
  });
});

// Delete weather condition by ID
router.delete('/:id', (req, res) => {
  WeatherConditionsService.deleteWeatherConditions(req.params.id, (err, changes) => {
    if (err) {
      sendResponse(res, 500, 'Failed to delete weather condition', null, err.message);
    } else if (changes === 0) {
      sendResponse(res, 404, `Weather condition with ID ${req.params.id} not found`);
    } else {
      sendResponse(res, 200, 'Weather condition deleted successfully', changes);
    }
  });
});

module.exports = router;
