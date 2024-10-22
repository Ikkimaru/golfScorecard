// Location: repositories/weatherConditions.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

// Repository for WeatherConditions operations
class WeatherConditionsRepository extends BaseRepository {
  constructor() {
    super(db, 'WeatherConditions');
  }

  addWeatherConditions(weatherConditions, callback) {
    const columns = [
      'temperature',
      'windSpeed',
      'weatherDescription',
      'chanceOfPrecipitation',
      'precipitationAmount',
      'date'
    ];
    const data = [
      weatherConditions.temperature,
      weatherConditions.windSpeed,
      weatherConditions.weatherDescription,
      weatherConditions.chanceOfPrecipitation,
      weatherConditions.precipitationAmount,
      weatherConditions.date
    ];
    super.add(data, columns, callback);
  }

  getAllWeatherConditions(callback) {
    super.getAll(callback);
  }

  getWeatherConditionsById(id, callback) {
    super.getById(id, callback);
  }

  updateWeatherConditions(id, weatherConditions, callback) {
    const columns = [
      'temperature',
      'windSpeed',
      'weatherDescription',
      'chanceOfPrecipitation',
      'precipitationAmount',
      'date'
    ];
    const data = [
      weatherConditions.temperature,
      weatherConditions.windSpeed,
      weatherConditions.weatherDescription,
      weatherConditions.chanceOfPrecipitation,
      weatherConditions.precipitationAmount,
      weatherConditions.date
    ];
    super.update(id, data, columns, callback);
  }

  deleteWeatherConditions(id, callback) {
    super.delete(id, callback);
  }
}

module.exports = new WeatherConditionsRepository();
