'use strict';

const express = require('express');
const morgan = require('morgan');

// require handler.js
const handler = require('./handlers/handlers');

const { users } = require('./data/users');

let currentUser = {};

// -----------------------------------------------------
// server endpoints
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints
app.get('/', handler.handleHomepage);

// a catchall endpoint that will send the 404 message.
app.get('*', handler.handleFourOhFour);

app.listen(8000, () => console.log('Listening on port 8000'));
