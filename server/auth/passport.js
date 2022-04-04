const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { getUserByEmail, createNewUser } = require('./helpers');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/redirect/google',
    scope: ['profile', 'email'],
  },
  async (issuer, profile, cb) => {
    try {
      const userEmail = profile.emails[0].value;
      const userData = await getUserByEmail(userEmail);
      if (!userData) {
        const newUser = await createNewUser(profile);
        return cb(null, newUser);
      }
      return cb(null, userData);
    } catch (err) {
      return cb(err);
    }
  },
));

passport.serializeUser((user, cb) => {
  cb(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

module.exports = passport;
