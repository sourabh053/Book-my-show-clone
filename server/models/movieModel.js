const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String], // Changed from String to array of strings
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  backPhoto: {
    type: String,
    required: true,
  },
  cast: {
    type: [
      {
        name: String,
        role: String,
        image: String,
      }
    ],
    default: [], 
  },
  crew: {
    type: [
      {
        name: String,
        role: String,
        image: String,
      }
    ],
    default: [], 
  },  
});

module.exports = mongoose.model("movies", movieSchema);