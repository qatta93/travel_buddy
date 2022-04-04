const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { getUserByEmail, createNewUser } = require('./helpers');

const router = express.Router();
const host = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/oauth2/redirect/google',
    scope: ['profile', 'email'],
  },
  async (issuer, profile, cb) => {
    const userEmail = profile.emails[0].value;
    const userData = await getUserByEmail(userEmail);
    console.log('user from db ==>', userData);

    if (!userData) {
    // create a user automatically at db with name and email
      const newUser = await createNewUser(profile);
      console.log(newUser);
      return cb(null, newUser);
    }
    return cb(null, userData);

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

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

router.get('/login/federated/google', passport.authenticate('google'));
router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: `${host}/`,
  failureRedirect: `${host}/login`,
}));
// router.post('/logout', function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
