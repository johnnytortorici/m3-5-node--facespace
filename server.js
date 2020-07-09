'use strict';

const express = require('express');
const morgan = require('morgan');

// require handler.js
const handler = require('./handlers/handlers');
// require users.js, the database of users
const { users } = require('./data/users');

// -----------------------------------------------------
// server endpoints
const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// endpoints
// home page endpoint
app.get('/', handler.handleHomepage);
// profile page endpoint
app.get('/users/:_id', handler.handleProfilePage);
// signin page endpoint
app.get('/signin', handler.handleSigninPage);
// login form post
app.post('/getname', handler.handleLogin);
// logout form post
app.post('/logout', handler.handleLogout);

// a catchall endpoint that will send the 404 message.
app.get('*', handler.handleFourOhFour);

app.listen(8000, () => console.log('Listening on port 8000'));
