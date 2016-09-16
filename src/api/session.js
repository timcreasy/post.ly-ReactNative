const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../../config');

router.post('/api/sessions', (req, res, next) => {
  console.log(req.body);
  let username = req.body.username
  User.findOne({username: username})
  .select('password')
  .exec( (err, user) => {
    if (err) { return next(err) };
    if (!user) { return res.status(401).send({error: 'Invalid'}) };
    bcrypt.compare(req.body.password, user.password, (err, valid) => {
      if (err) { return next(err) };
      if (!valid) { return res.sendStatus(401) };
      const token = jwt.encode({username: username}, config.secret);
      res.send({token});
    });
  });
});

module.exports = router;