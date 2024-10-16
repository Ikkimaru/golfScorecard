// Location: routes/utils/responseUtil.js

// Helper function for sending responses
const sendResponse = (res, statusCode, message, data = null, details = null) => {
    const response = { message };
    if (data) response.data = data;
    if (details) response.details = details;
    res.status(statusCode).json(response);
  };
  
  module.exports = { sendResponse };
  