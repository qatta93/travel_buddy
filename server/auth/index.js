const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { getUserByEmail } = require('./helpers');

const router = express.Router();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/oauth2/redirect/google',
    scope: ['profile', 'email'],
  },
  (issuer, profile) => {
    const userEmail = profile.emails[0].value;
    getUserByEmail(userEmail);

    // db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
    //   issuer,
    //   profile.id
    // ], (err, row) => {
    //   if (err) { return cb(err); }
    //   if (!row) {
    //     db.run('INSERT INTO users (name) VALUES (?)', [
    //       profile.displayName
    //     ], (err) => {
    //       if (err) { return cb(err); }

    //       var id = this.lastID;
    //       db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
    //         id,
    //         issuer,
    //         profile.id
    //       ], function(err) {
    //         if (err) { return cb(err); }
    //         var user = {
    //           id: id,
    //           name: profile.displayName
    //         };
    //         return cb(null, user);
    //       });
    //     });
    //   } else {
    //     db.get('SELECT rowid AS id, * FROM users WHERE rowid = ?', [ row.user_id ], function(err, row) {
    //       if (err) { return cb(err); }
    //       if (!row) { return cb(null, false); }
    //       return cb(null, row);
    //     });
    //   }
    // });
  },
));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username, name: user.name });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));
// router.post('/logout', function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// });

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
