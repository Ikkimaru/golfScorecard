// Location: seeds/player.seeder.js

const { db } = require('../database/databaseManagement'); // Adjust the path as needed

const seedPlayers = () => {
  const players = [
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'a', handicapIndex: 10.5 },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', password: 'a', handicapIndex: 12.0 },
    { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@example.com', password: 'a', handicapIndex: 8.0 },
    { firstName: 'Emily', lastName: 'Davis', email: 'emily.davis@example.com', password: 'a', handicapIndex: 15.5 },
    { firstName: 'Chris', lastName: 'Brown', email: 'chris.brown@example.com', password: 'a', handicapIndex: 5.0 },
  ];

  const insertPlayerQuery = `
    INSERT INTO Player (FirstName, LastName, Email, Password, HandicapIndex)
    VALUES (?, ?, ?, ?, ?);
  `;

  players.forEach(player => {
    db.run(insertPlayerQuery, [player.firstName, player.lastName, player.email, player.password, player.handicapIndex], (err) => {
      if (err) {
        console.error(`Error seeding player ${player.firstName} ${player.lastName}:`, err.message);
      } else {
        console.log(`Seeded player: ${player.firstName} ${player.lastName}`);
      }
    });
  });
};

module.exports = seedPlayers;
