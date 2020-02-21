const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const jwt = require('jsonwebtoken');

const api = require('./server/routes/api');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create the HTTP Server
const server = http.createServer(app);

app.listen(port, () => console.log(`Running on localhost:${port}`));

