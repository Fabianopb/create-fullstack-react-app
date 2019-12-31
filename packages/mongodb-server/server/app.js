const express = require('express');
const path = require('path');
const itemsController = require('./items/items.controller');
const usersController = require('./users/users.controller');

// Create the express application
const app = express();

// Assign controllers to routes
app.use('/api/items', itemsController);
app.use('/api/users', usersController);

// Declare the path to frontend's static assets
app.use(express.static(path.resolve('..', 'frontend', 'build')));

// Intercept requests to return the frontend's static entry point
app.get('*', (_, response) => {
  response.sendFile(path.resolve('..', 'frontend', 'build', 'index.html'));
});

module.exports = app;
