const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const key = require('../../config/keys').secret;
const User = require('../../model/User');
const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, moment().format('YYYY_MM_DD_HH_mm_ss') + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/gif'
  ) {
    cb(null, true);
  } else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

/**
 * @route POST api/users/register
 * @desc Register the User
 * @access Public
 */
router.post('/register', (req, res) => {
  let { name, username, email, password, confirmPassword, avatarURL } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: 'Password do not match.',
    });
  }
  // Check for the unique Username
  User.findOne({
    username: username,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Username is already taken.',
      });
    }
  });
  // Check for the Unique Email
  User.findOne({
    email: email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        msg: 'Email is already registred. Did you forgot your password.',
      });
    }
  });
  // The data is valid and new we can register the user
  let newUser = new User({
    name,
    username,
    password,
    email,
    avatarURL,
  });
  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        return res.status(201).json({
          success: true,
          msg: 'Hurry! User is now registered.',
        });
      });
    });
  });
});

/**
 * @route GET api/users/me
 * @desc Get Logged User Data
 * @access Public
 */

/**
 * @route POST api/users/login
 * @desc Signing in the User
 * @access Public
 */
router.post('/login', (req, res) => {
  User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] }).then(
    (user) => {
      if (!user) {
        return res.status(404).json({
          msg: 'Username is not found.',
          success: false,
        });
      }
      // If there is user we are now going to compare the password
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (isMatch) {
          // User's password is correct and we need to send the JSON Token for that user
          const payload = {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
          };
          jwt.sign(
            payload,
            key,
            {
              expiresIn: 604800,
            },
            (err, token) => {
              res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user: user,
                msg: 'Hurry! You are now logged in.',
              });
            },
          );
        } else {
          return res.status(404).json({
            msg: 'Incorrect password.',
            success: false,
          });
        }
      });
    },
  );
});

/**
 * @route GET api/users/profile
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  '/profile',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  },
);
/**
 * @route POST api/users/profile
 * @desc Edit the User's Data
 * @access Private
 */
router.post(
  '/profile',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    User.findOne(req.user._id).then((user) => {});
  },
);
/**
 * @route POST api/users/avatar
 * @desc Edit the User's Data
 * @access Private
 */
router.post(
  '/avatar',
  passport.authenticate('jwt', {
    session: false,
  }),
  upload.single('avatar'),
  (req, res) => {
    res.status(200).json({
      success: true,
      avatarURL: req.file.path,
      msg: 'avatar uploaded',
    });
  },
);
module.exports = router;
