const express = require('express');
const passport = require('./passport');
require('dotenv').config();

const router = express.Router();
const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

router.get('/login/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  failureRedirect: `${host}/login`,
}), (req, res) => res.redirect(`${host}/`));

router.post('/logout', (req, res) => {
  req.logout();
  return res
    .send({ status: 'success' });
});

router.get('/user', (req, res) => {
  const user = req.user || null;
  return res
    .send({ status: 'success', data: user });
});

module.exports = router;
