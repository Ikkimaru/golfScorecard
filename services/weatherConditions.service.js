// Location: services/weatherConditions.service.js

const WeatherConditionsRepository = require("../repositories/weatherConditions.repository");
const WeatherConditions = require("../models/weatherconditions.model");
const WeatherConditionsEntity = require("../database/entities/weatherConditionsEntity");

class WeatherConditionsService {
  static addWeatherConditions(weatherData, callback) {
    try {
      const weatherConditions = new WeatherConditions(
        null, // WeatherID will be auto-generated
        weatherData.temperature,
        weatherData.windSpeed,
        weatherData.weatherDescription,
        weatherData.chanceOfPrecipitation,
        weatherData.precipitationAmount,
        weatherData.date
      );
      const weatherConditionsEntity = new WeatherConditionsEntity(
        null, // WeatherID will be auto-generated
        weatherConditions.temperature,
        weatherConditions.windSpeed,
        weatherConditions.weatherDescription,
        weatherConditions.chanceOfPrecipitation,
        weatherConditions.precipitationAmount,
        weatherConditions.date
      );

      WeatherConditionsRepository.addWeatherConditions(weatherConditionsEntity, (err, id) => {
        if (err) {
          callback(err);
        } else {
          callback(null, id);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static getAllWeatherConditions(callback) {
    WeatherConditionsRepository.getAllWeatherConditions((err, weatherConditions) => {
      if (err) {
        callback(err);
      } else {
        callback(null, weatherConditions);
      }
    });
  }

  static getWeatherConditionsById(id, callback) {
    WeatherConditionsRepository.getWeatherConditionsById(id, (err, weatherCondition) => {
      if (err) {
        callback(err);
      } else {
        callback(null, weatherCondition);
      }
    });
  }

  static updateWeatherConditions(id, weatherData, callback) {
    try {
      const weatherConditions = new WeatherConditions(
        id,
        weatherData.temperature,
        weatherData.windSpeed,
        weatherData.weatherDescription,
        weatherData.chanceOfPrecipitation,
        weatherData.precipitationAmount,
        weatherData.date
      );
      const weatherConditionsEntity = new WeatherConditionsEntity(
        id,
        weatherConditions.temperature,
        weatherConditions.windSpeed,
        weatherConditions.weatherDescription,
        weatherConditions.chanceOfPrecipitation,
        weatherConditions.precipitationAmount,
        weatherConditions.date
      );

      WeatherConditionsRepository.updateWeatherConditions(id, weatherConditionsEntity, (err, changes) => {
        if (err) {
          callback(err);
        } else {
          callback(null, changes);
        }
      });
    } catch (err) {
      callback(err);
    }
  }

  static deleteWeatherConditions(id, callback) {
    WeatherConditionsRepository.deleteWeatherConditions(id, (err, changes) => {
      if (err) {
        callback(err);
      } else {
        callback(null, changes);
      }
    });
  }
}

module.exports = WeatherConditionsService;
