const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Post Schema

const PostSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  likesCount: {
    type: Number,
    default: 0,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hashtags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('posts', PostSchema);
