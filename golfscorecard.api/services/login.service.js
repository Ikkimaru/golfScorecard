// Location: services/login.service.js

const bcrypt = require('bcryptjs');

async function verifyPassword(enteredPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return isMatch; // returns true if passwords match, false otherwise
}
