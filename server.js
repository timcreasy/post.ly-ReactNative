const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();



require('./db')

app.use(bodyParser.json());

app.get('/api/users', (req, res, next) => {
  User.findOne({}, (err, users) => {
    if (err) { return next(err) };
    res.json(users);
  });
});


app.post('/api/users', (req, res, next) => {
  User.findOne({"username": req.body.username}, (err, user) => {
    if (err) { return next(err) };
    console.log(user);
  });
});

app.listen(3000, () => {
  console.log("Server listening at port 3000...");
});
