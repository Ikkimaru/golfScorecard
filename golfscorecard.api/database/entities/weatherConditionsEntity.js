// Location: database/entities/weatherConditionsEntity.js

const BaseEntity = require('./baseEntity');

class WeatherConditionsEntity extends BaseEntity {
    constructor(id, temperature, windSpeed, weatherDescription, chanceOfPrecipitation, precipitationAmount, date) {
      super(id); // Call the constructor of BaseEntity
      this.temperature = temperature; // Recorded temperature
      this.windSpeed = windSpeed; // Recorded wind speed
      this.weatherDescription = weatherDescription; // Description of weather conditions
      this.chanceOfPrecipitation = chanceOfPrecipitation; // Probability of precipitation
      this.precipitationAmount = precipitationAmount; // Recorded precipitation amount
      this.date = date; // Date the record was captured
    }
}

module.exports = WeatherConditionsEntity;
