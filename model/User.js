const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create User Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  avatarURL: {
    type: String,
    default: null,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('users', UserSchema);
