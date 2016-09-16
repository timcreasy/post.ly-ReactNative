const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/social'

mongoose.connect(MONGODB_URL, () => {
  console.log("mongodb connected");
});

module.exports = mongoose;
