require('dotenv').config(); // Load environment variables from the .env file

module.exports = {
  // Directly use the environment variables loaded by dotenv
  MONGO_URI: process.env.MONGO_URI,       // MongoDB URI
  JWT_SECRET: process.env.JWT_SECRET,     // Secret for JWT authentication
  SUPPORTED_LANGUAGES: ['kiswahili', 'dinka', 'english'], // Static values for supported languages
};
