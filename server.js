const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();

require('./db')
app.use(bodyParser.json());


app.use(require('./src/api/session'));
app.use(require('./src/api/user'));

app.listen(3000, () => {
  console.log("Server listening at port 3000...");
});
