const express = require('express');
const cors = require('cors');
const path = require('path');
const usersRouter = require('./users');
const tripsRouter = require('./trips');
const countriesRouter = require('./countries');
const activitiesRouter = require('./activities');
const requestsRouter = require('./requests');

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/requests', requestsRouter);

app.use('/api', (req, res) => res.status(404).end());

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  return res.status(500).json({ status: 'error', message: err.message });
});

module.exports = app;
