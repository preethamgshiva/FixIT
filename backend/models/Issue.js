const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  description: String,
  imageUrl: String,
  location: {
    lat: Number,
    lng: Number
  },
  // This captures both date and time when the issue is created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issue', issueSchema);
