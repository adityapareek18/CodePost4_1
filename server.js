const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const jwt = require('jsonwebtoken');

const app = express();

const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err)
        req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// Set our api routes
app.use('/api', api);

// Return other routes to Angular index file..
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//app.route('post').post(api.loginRequired)

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create the HTTP Server
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));