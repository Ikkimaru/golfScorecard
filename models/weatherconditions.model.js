// Location: models/weatherconditions.model.js

class WeatherConditions {
    constructor(weatherID, temperature, windSpeed, weatherDescription, chanceOfPrecipitation, precipitationAmount, date) {
      this.weatherID = weatherID; // Unique ID for the weather record
      this.temperature = temperature; // Temperature in real number (e.g. Celsius or Fahrenheit)
      this.windSpeed = windSpeed; // Wind speed (in km/h or mph)
      this.weatherDescription = weatherDescription; // Description of the weather (e.g., "Sunny", "Rainy")
      this.chanceOfPrecipitation = chanceOfPrecipitation; // Probability of precipitation in percentage
      this.precipitationAmount = precipitationAmount; // Amount of precipitation (e.g. in mm or inches)
      this.date = date; // Date of the weather record
    }
  }
  
  module.exports = WeatherConditions;
  