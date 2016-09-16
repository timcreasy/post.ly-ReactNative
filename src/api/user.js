const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../../config');

// router.get('/api/users', (req, res, next) => {
//   User.findOne({}, (err, users) => {
//     if (err) { return next(err) };
//     res.json(users);
//   });
// });


// router.post('/api/users', (req, res, next) => {
//   User.findOne({"username": req.body.username}, (err, user) => {
//     if (err) { return next(err) };
//     console.log(user);
//   });
// });


router.get('/api/users', (req, res, next) => {
  if (!req.headers['x-auth']) {
    return res.sendStatus(401);
  }
  const auth = jwt.decode(req.headers['x-auth'], config.secret);
  User.findOne({username: auth.username}, (err, user) => {
    if (err) { return next(err) };
    res.json(user);
  });
});

router.post('api/users', (req, res, next) => {
  let user = new User({username: req.body.username});
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) { return next(err) };
    user.password = hash;
    user.save((err) => {
      if (err) { return next(err) };
      res.sendStatus(201);
    });
  });
});

module.exports = router;