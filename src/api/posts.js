const Post = require('../../models/post');
const router = require('express').Router();

router.get('/api/posts', (req, res, next) => {
  Post.find()
  .sort('-date')
  .exec((err, posts) => {
    if (err) { return next(err) };
    res.json(posts);
  });
});

router.post('/api/posts', (req, res, next) => {

  // let post = new Post({ body: req.body.body, username: req.body.username });
  // post.save(function (err, post) {
  //   if (err) { return next(err) };
  //   res.status(201).json(post);
  // });

  // WITH AUTH
  let post = new Post({ body: req.body.body });
  post.username = req.auth.username;
  post.save(function (err, post) {
    if (err) { return next(err) }
    res.status(201).json(post)
  });

});

module.exports = router;
