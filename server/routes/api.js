const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
const user = require('../models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// const db = "mongodb://localhost:27017/codepostnet";
const db = "mongodb+srv://guest:guest@cluster0-l5hmi.mongodb.net/codepostnet?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose.connect(db, {useNewUrlParser: true}).then(() => {
  console.log('Connection to the Atlas Cluster is successful!')
})
  .catch((err) => console.error(err));

router.get('/posts', verifyToken, function (req, res) {
  console.log('Requesting posts');
  post.find({})
    .exec(function (err, posts) {
      if (err) {
        console.log('Error getting the posts');
      } else {
        res.json(posts);
      }
    });
});

router.get('/posts/:userId', verifyToken, function (req, res) {
  console.log('TOKENWA' + req.token);
  jwt.verify(req.token, 'RESTFULAPIs', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      console.log('Requesting posts');
      post.find({
        userId: req.params.userId
      }).exec(function (err, posts) {
        if (err) {
          console.log('Error getting the posts');
        } else {
          res.json(posts);
        }
      });
    }
  })
});


router.get('/details/:id', function (req, res) {
  console.log('Requesting post');
  post.findById(req.params.id)
    .exec(function (err, post) {
      if (err) {
        console.log('Error getting the post');
      } else {
        res.json(post);
      }
    });
});

router.post('/posts', function (req, res) {
  console.log('Posting a post');
  var newPost = new post();
  newPost.userId = req.body.userId;
  newPost.title = req.body.title;
  newPost.description = req.body.description;
  newPost.startDate = req.body.startDate;
  newPost.startTime = req.body.startTime;
  newPost.endTime = req.body.endTime;
  newPost.save(function (err, addedPost) {
    if (err) {
      console.log(err);
      console.log('Error inserting the post');
    } else {
      res.json(addedPost);
    }
  });
});

router.post('/users', function (req, res) {
  console.log('Creating a user');
  var newUser = new user();
  newUser.firstName = req.body.firstName;
  newUser.password = req.body.lastName;
  newUser.username = req.body.username;
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser.created = moment();
  newUser.save().then((createdUser) => {
    res.status(201).json({message: 'User Created!',
    obj: createdUser});
    console.log('Registration Successful');
  });
});

router.get('/users', function (req, res) {
  console.log('Requesting users');
  user.find({})
    .exec(function (err, users) {
      if (err) {
        console.log('Error getting the users');
      } else {
        res.json(users);
      }
    });
});

router.get('/users/:id', function (req, res) {
  console.log('Requesting user with id');
  user.findById(req.params.id)
    .exec(function (err, user) {
      if (err) {
        console.log('Error getting user');
      } else if (user) {
        res.send(user);
        console.log(user);
      }
    });
});


router.post('/authenticate', function (req, res) {
  console.log(req.body.username + " " + req.body.password);
  user.findOne({
    username: req.body.username
  }).exec(function (err, foundUser) {
    if (err) {
      console.log('Error getting the users');
      res.status(404);
    } else if (!foundUser) {
      res.status(401).json({message: 'User Not Found'});
    } else if (foundUser) {
      if (foundUser.comparePassword(req.body.password)) {
        const payload = {
          _id: foundUser._id
        };
        var token = jwt.sign(payload, 'RESTFULAPIs', {
          expiresIn: 1440
        });
        console.log('Sending the fucking response.');
        res.json({
          id: foundUser._id,
          success: true,
          message: 'Enjoy your token!',
          token: token,
          status: 200,
          expiresIn: 1440
        });
      }
    }
  });
});

router.delete('/posts/:id', function (req, res) {
  console.log('Deleting a post');
  post.deleteOne({
    _id: req.params.id
  }).exec(function (err, post) {
    if (err) {
      console.log('Error deleting the users');
    } else if (post) {
      res.json({message: 'User Deleted', status: 200});
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    console.log('token is' + bearerToken);
    req.token = bearerToken;
    next();
  } else {
    console.log('No Token');
    res.status(403);
  }
}


module.exports = router;
