const express = require('express');
const router = express.Router();
const Post = require('../../model/Post');
const User = require('../../model/User');
const passport = require('passport');

/**
 * @route POST api/posts/create
 * @desc Add new post
 * @access Private
 */
router.post(
  '/create',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    let { content } = req.body;
    if (!content) {
      return res.status(400).json({
        msg: 'Post cannot be empty',
      });
    }

    let newPost = new Post({
      content,
      type: 'text',
      author: req.user._id,
      hashtags: [],
    });

    let hashtagsWithSymbol = newPost.content.match(/#[a-z]+/gi);
    let hashtagsWithoutSymbol = [];
    if (Array.isArray(hashtagsWithSymbol) && hashtagsWithSymbol.length) {
      hashtagsWithSymbol.forEach((string) => {
        let stringWithoutSymbol = string.replace(/^#+/i, '');
        hashtagsWithoutSymbol.push(stringWithoutSymbol);
      });
      newPost.hashtags = hashtagsWithoutSymbol;
    }

    newPost
      .save()
      .then((post) => {
        User.findById(req.user._id)
          .then((user) => {
            user.posts.push(post);
            user
              .save()
              .then((user) => {
                console.log(newPost);
                return res.status(201).json({
                  success: true,
                  msg: 'Hurry! Post created.',
                  post: newPost,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
);
/**
 * @route GET api/posts
 * @desc Get all posts
 * @access Private
 */
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    let posts = Post.find()
      .sort({ createdAt: 'desc' })
      .populate('author')
      .then((posts) => {
        return res.status(200).json({
          success: true,
          posts: posts,
        });
      });

    // if (posts) {
    //   return res.status(200).json({
    //     posts: posts,
    //   });
    // }
  },
);

/**
 * @route GET api/posts
 * @desc Get all posts
 * @access Private
 */
router.get(
  '/hashtag/:hashtag',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    let posts = Post.find({ hashtag: { $in: req.params.hashtag } })
      .sort({ createdAt: 'desc' })
      .populate('author')
      .then((posts) => {
        return res.status(200).json({
          success: true,
          posts: posts,
        });
      });

    // if (posts) {
    //   return res.status(200).json({
    //     posts: posts,
    //   });
    // }
  },
);

module.exports = router;
