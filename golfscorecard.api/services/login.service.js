const LoginRepository = require("../repositories/login.repository");

class LoginService {
    static getLoginDetails({ username, password }, callback) {
        // Retrieve user details by username
        LoginRepository.getLoginDetails(username, async (err, user) => {
            if (err) {
                return callback(err);
            }
            // Check if user exists and verify password
            if (user && password === user.Password) {
                // Passwords match, return user details without password
                const { password, ...userWithoutPassword } = user;
                return callback(null, userWithoutPassword);
            } else {
                // User not found or password mismatch
                return callback(null, null);
            }
        });
    }
}

module.exports = LoginService;
