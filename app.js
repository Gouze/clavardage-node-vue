const express = require('express');
const Post = require('./model/Post');
const User = require('./model/User');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const passport = require('passport');

// Initialize app
const app = express();

// Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

//setting up static dir
app.use(express.static(path.join(__dirname, 'public')));

//Bring in the db config
const db = require('./config/keys');
const PORT = process.env.PORT || 3000;

mongoose
  .connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('db ok');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  return res.send('<h1>hello world</h1>');
});

// Bring  users routes

app.use('/api/users', users);
app.use('/api/posts', posts);
