const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('./users');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.message);
  next(err);
});

module.exports = app;
