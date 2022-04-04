const express = require('express');
const passport = require('./passport');

const router = express.Router();
const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

router.get('/login/google', passport.authenticate('google'));

router.get('/redirect/google', passport.authenticate('google', {
  successRedirect: `${host}/`,
  failureRedirect: `${host}/login`,
}));

router.post('/logout', (req, res) => {
  req.logout();
  res.send({ status: 'success' });
});

router.get('/user', (req, res) => {
  const user = req.user || null;
  return res.send({ status: 'success', data: user });
});

module.exports = router;
