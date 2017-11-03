// Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Configure mongodb
mongoose.connect(config.database);

// Connect to DB
mongoose.connection.on('connected', () => {
  console.log('Connnected to database ' + config.database);
});

// Connect to DB
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

// Port number
const port = 3000;

// CORS setup
app.use(cors());

// Set static folder (Angular)
app.use(express.static(path.join(__dirname, 'public')));

// Setup  Body Parser
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start the server
app.listen(port, () => {
  console.log("Server online and listening on port " + port);
});