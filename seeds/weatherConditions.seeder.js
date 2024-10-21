// Location: seeds/weatherConditions.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedWeatherConditions = () => {
  const weatherConditions = [
    { temperature: 75.0, windSpeed: 5.0, description: 'Sunny', chanceOfPrecipitation: 0, precipitationAmount: 0, date: '2023-10-01' },
    { temperature: 68.0, windSpeed: 10.0, description: 'Partly Cloudy', chanceOfPrecipitation: 20, precipitationAmount: 0.1, date: '2023-10-02' },
  ];

  const insertWeatherConditionQuery = `
    INSERT INTO WeatherConditions (Temperature, WindSpeed, WeatherDescription, ChanceOfPrecipitation, PrecipitationAmount, Date)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  weatherConditions.forEach(condition => {
    db.run(insertWeatherConditionQuery, [condition.temperature, condition.windSpeed, condition.description, condition.chanceOfPrecipitation, condition.precipitationAmount, condition.date], (err) => {
      if (err) {
        console.error(`Error seeding weather condition for date ${condition.date}:`, err.message);
      } else {
        console.log(`Seeded weather condition for date: ${condition.date}`);
      }
    });
  });
};

module.exports = seedWeatherConditions;
