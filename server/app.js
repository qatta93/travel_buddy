const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
// const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('passport');
const usersRouter = require('./users');
const tripsRouter = require('./trips');
const countriesRouter = require('./countries');
const indexRouter = require('./auth');
const authRouter = require('./auth');
const activitiesRouter = require('./activities');
const requestsRouter = require('./requests');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credential: true,
}));

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/auth', indexRouter);
app.use('/api/auth', authRouter);
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
