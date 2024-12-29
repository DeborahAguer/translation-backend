// models/Translation.js
const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  wordOriginal: {
    type: String,
    required: true,
  },
  wordTranslated: {
    type: String,
    required: true,
  },
  languageFrom: {
    type: String,
    required: true,
  },
  languageTo: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Translation', translationSchema);
