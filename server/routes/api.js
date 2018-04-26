const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');
const user = require('../models/user');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const db = "mongodb://localhost:27017/codepostnet";

mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
    if (err) {
        console.log('Connection error');
    }
});

router.get('/posts', function (req, res) {
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
    newPost.title = req.body.title;
    newPost.description = req.body.description;
    newPost.startDate = req.body.startDate;
    newPost.startTime = req.body.startTime;
    newPost.endTime = req.body.endTime;
    newPost.save(function (err, addedPost) {
        if (err) {
            console.log('Error inserting the post');
        } else {
            res.json(addedPost);
        }
    });
});

router.post('/posts', function (req, res) {
    console.log('Posting a post');
    var newPost = new post();
    newPost.title = req.body.title;
    newPost.description = req.body.description;
    newPost.startDate = req.body.startDate;
    newPost.startTime = req.body.startTime;
    newPost.endTime = req.body.endTime;
    newPost.save(function (err, addedPost) {
        if (err) {
            console.log('Error inserting the post');
        } else {
            res.json(addedPost);
        }
    });
});

router.post('/users', function (req, res) {
    console.log('Creating a user');
    var newUser = new user();
    newUser.username = req.body.firstName;
    newUser.password = req.body.lastName;
    newUser.username = req.body.username;
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.created = moment();
    newUser.save(function (err, createdUser) {
        if (err) {
            console.log('Error creating the user');
        } else {
            res.json(createdUser);
        }
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

router.get('/authenticate', function (req, res) {
    user.findOne({
        username: req.body.username
    }).exec(function (err, foundUser) {
        if (err) {
            console.log('Error getting the users');
        } else if (!foundUser) {
            res.status(401).json({ message: 'User Not Found' });
        } else if (foundUser) {
            if (foundUser.comparePassword(req.body.password)) {
                res.status(200).json({ token: jwt.sign({ username: user.username, firstName: user.firstName, _id: user._id }, 'RESTFULAPIs') });
            }
        }
    });
});

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized User!' });
    }

}

router.delete('/posts/:id', function (req, res) {
    console.log('Deleting a post');
    post.deleteOne({
        _id: req.params.id
    }).exec(function(err, post) {
        if (err) {
            console.log('Error deleting the users');
        } else if (post) {
            res.status(200).json({ message: 'User Deleted' });
        }
    });
});



module.exports = router;