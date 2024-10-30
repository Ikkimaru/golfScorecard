// Location: repositories/login.repository.js

const BaseRepository = require('./base.repository');
const { db } = require('../database/databaseManagement');

class LoginRepository extends BaseRepository {
    constructor() {
        super(db, 'Player');
    }
    // Fetch user by email
    getLoginDetails(username, callback) {
        const query = `SELECT * FROM Player WHERE Email = ?`;

        db.get(query, [username], (err, row) => {
            if (err) {
                return callback(err);
            }
            // Return user data
            callback(null, row);
        });
    }
}

module.exports = new LoginRepository();
