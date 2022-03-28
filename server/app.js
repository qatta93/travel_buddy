const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('./users');

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;
