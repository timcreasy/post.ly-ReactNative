const mongoose = require('mongoose');

  // tcreasy:mypassword
  // mongodb://<dbuser>:<dbpassword>@ds033046.mlab.com:33046/timcreasy-postly


mongoose.connect('mongodb://localhost/social', () => {
  console.log("mongodb connected");
});

module.exports = mongoose;
