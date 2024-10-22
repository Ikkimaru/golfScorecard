// Location: tests/achievement.service.test.js

const AchievementService = require('../services/achievement.service');
const AchievementRepository = require('../repositories/achievement.repository');
const { db } = require('../database/databaseManagement'); // Assuming this is your db connection

// Mock the repository to avoid real DB calls
jest.mock('../repositories/achievement.repository');

describe('AchievementService', () => {
    let consoleLogSpy;

    beforeAll((done) => {
        // Mock console.log to suppress the logs during the test
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        // Ensure database is connected before tests run
        db.serialize(() => {
            // Assume db.run runs a sample query to ensure the DB is active for tests
            db.run('SELECT 1', (err) => {
                if (err) {
                    console.error('Failed to connect to the database:', err.message);
                    done(err);
                } else {
                    console.log('Test DB connection established.');
                    done();
                }
            });
        });
    });

    afterAll((done) => {
        // Restore console.log after the tests
        consoleLogSpy.mockRestore();
        // Close the DB connection after the tests
        db.close((err) => {
            if (err) {
                console.error('Failed to close the database:', err.message);
            } else {
                console.log('Test DB connection closed.');
            }
            done();
        });
    });

    // Test for addAchievement
    describe('addAchievement', () => {
        it('should add an achievement and return the ID', (done) => {
            const mockData = {
                playerID: 1,
                achievementDescription: 'Hole in one',
                dateAchieved: '2024-10-22',
            };

            const mockID = 123; // Mock the returned ID

            // Mock the addAchievement behavior
            AchievementRepository.addAchievement.mockImplementation((entity, callback) => {
                callback(null, mockID); // Simulate a successful DB insertion
            });

            AchievementService.addAchievement(mockData, (err, id) => {
                expect(err).toBeNull();
                expect(id).toBe(mockID);
                done(); // Call done to signal the end of async test
            });
        });

        it('should return an error if adding an achievement fails', (done) => {
            const mockData = {
                playerID: 1,
                achievementDescription: 'Hole in one',
                dateAchieved: '2024-10-22',
            };

            const mockError = new Error('DB error');

            // Mock the addAchievement behavior to throw an error
            AchievementRepository.addAchievement.mockImplementation((entity, callback) => {
                callback(mockError);
            });

            AchievementService.addAchievement(mockData, (err, id) => {
                expect(err).toBe(mockError);
                expect(id).toBeUndefined();
                done();
            });
        });
    });

    // Test for getAllAchievements
    describe('getAllAchievements', () => {
        it('should return all achievements', (done) => {
            const mockAchievements = [
                { id: 1, playerID: 1, achievementDescription: 'Hole in one', dateAchieved: '2024-10-21' },
                { id: 2, playerID: 2, achievementDescription: 'Longest drive', dateAchieved: '2024-10-22' },
            ];

            // Mock getAllAchievements behavior
            AchievementRepository.getAllAchievements.mockImplementation((callback) => {
                callback(null, mockAchievements);
            });

            AchievementService.getAllAchievements((err, achievements) => {
                expect(err).toBeNull();
                expect(achievements).toEqual(mockAchievements);
                done();
            });
        });

        it('should return an error if fetching achievements fails', (done) => {
            const mockError = new Error('DB error');

            // Mock getAllAchievements to return an error
            AchievementRepository.getAllAchievements.mockImplementation((callback) => {
                callback(mockError);
            });

            AchievementService.getAllAchievements((err, achievements) => {
                expect(err).toBe(mockError);
                expect(achievements).toBeUndefined();
                done();
            });
        });
    });

    // Test for getAchievementById
    describe('getAchievementById', () => {
        it('should return the achievement by ID', (done) => {
            const mockAchievement = { id: 1, playerID: 1, achievementDescription: 'Hole in one', dateAchieved: '2024-10-22' };

            // Mock getAchievementById behavior
            AchievementRepository.getAchievementById.mockImplementation((id, callback) => {
                callback(null, mockAchievement);
            });

            AchievementService.getAchievementById(1, (err, achievement) => {
                expect(err).toBeNull();
                expect(achievement).toEqual(mockAchievement);
                done();
            });
        });

        it('should return an error if fetching achievement by ID fails', (done) => {
            const mockError = new Error('DB error');

            // Mock getAchievementById to return an error
            AchievementRepository.getAchievementById.mockImplementation((id, callback) => {
                callback(mockError);
            });

            AchievementService.getAchievementById(1, (err, achievement) => {
                expect(err).toBe(mockError);
                expect(achievement).toBeUndefined();
                done();
            });
        });
    });

    // Test for updateAchievement
    describe('updateAchievement', () => {
        it('should update an achievement and return true on success', (done) => {
            const mockID = 1;
            const mockData = {
                achievementDescription: 'Updated description',
                dateAchieved: '2024-10-23',
            };

            // Mock the updateAchievement behavior
            AchievementRepository.updateAchievement.mockImplementation((id, data, callback) => {
                callback(null, true); // Simulate a successful DB update
            });

            AchievementService.updateAchievement(mockID, mockData, (err, result) => {
                expect(err).toBeNull();
                expect(result).toBe(true);
                done();
            });
        });

        it('should return an error if updating an achievement fails', (done) => {
            const mockID = 1;
            const mockData = {
                achievementDescription: 'Updated description',
                dateAchieved: '2024-10-23',
            };

            const mockError = new Error('DB error');

            // Mock the updateAchievement behavior to return an error
            AchievementRepository.updateAchievement.mockImplementation((id, data, callback) => {
                callback(mockError);
            });

            AchievementService.updateAchievement(mockID, mockData, (err, result) => {
                expect(err).toBe(mockError);
                expect(result).toBeUndefined();
                done();
            });
        });
    });

    // Test for deleteAchievement
    describe('deleteAchievement', () => {
        it('should delete an achievement and return true on success', (done) => {
            const mockID = 1;

            // Mock the deleteAchievement behavior
            AchievementRepository.deleteAchievement.mockImplementation((id, callback) => {
                callback(null, true); // Simulate a successful DB deletion
            });

            AchievementService.deleteAchievement(mockID, (err, result) => {
                expect(err).toBeNull();
                expect(result).toBe(true);
                done();
            });
        });

        it('should return an error if deleting an achievement fails', (done) => {
            const mockID = 1;

            const mockError = new Error('DB error');

            // Mock the deleteAchievement behavior to return an error
            AchievementRepository.deleteAchievement.mockImplementation((id, callback) => {
                callback(mockError);
            });

            AchievementService.deleteAchievement(mockID, (err, result) => {
                expect(err).toBe(mockError);
                expect(result).toBeUndefined();
                done();
            });
        });
    });

});
