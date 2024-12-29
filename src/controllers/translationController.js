// controllers/translationController.js
const Translation = require('../models/Translation'); // Importing Translation model
const mongoose = require('mongoose');

// Add a new translation (protected route for logged-in users)
exports.addTranslation = async (req, res) => {
  try {
    const { wordOriginal, wordTranslated, languageFrom, languageTo } = req.body;

    // Create a new translation entry with the logged-in user's ID
    const newTranslation = new Translation({
      wordOriginal,
      wordTranslated,
      languageFrom,
      languageTo,
      createdBy: req.user.userId, // User ID from decoded JWT
    });

    await newTranslation.save();
    res.status(201).json({ message: 'Translation added successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during translation addition.' });
  }
};

// View or search for translations (public access)
exports.getTranslations = async (req, res) => {
  try {
    const { search } = req.query;

    // If search is provided, search for the translation of the given word
    if (search) {
      // Search for a translation where the word is either the original or the translated word
      const translation = await Translation.findOne({
        $or: [
          { wordOriginal: new RegExp(search, 'i') },  // Search for the original word
          { wordTranslated: new RegExp(search, 'i') } // Or search for the translated word
        ]
      }).select('wordOriginal wordTranslated'); // Select only the relevant fields

      if (!translation) {
        return res.status(404).json({ message: 'Translation not found.' });
      }

      // Return the corresponding translation (either original or translated word)
      const result = {
        wordOriginal: translation.wordOriginal,
        wordTranslated: translation.wordTranslated
      };

      // If the search word is wordTranslated, swap the words in the response
      if (translation.wordOriginal.toLowerCase() === search.toLowerCase()) {
        return res.json(result);
      } else {
        return res.json({
          wordOriginal: translation.wordTranslated,
          wordTranslated: translation.wordOriginal
        });
      }
    }

    res.status(400).json({ message: 'Please provide a search term.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during translation retrieval.' });
  }
};